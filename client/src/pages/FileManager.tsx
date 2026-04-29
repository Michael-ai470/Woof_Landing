import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, File, Trash2, Download, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";

/**
 * File Manager Page
 * Allows authenticated users to upload, view, and manage ebook assets
 * Files are stored in S3 and referenced in the database
 */
export default function FileManager() {
  const { user, isAuthenticated } = useAuth();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch files list
  const { data: files = [], isLoading, refetch } = trpc.files.list.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  // Upload file mutation
  const uploadMutation = trpc.files.upload.useMutation({
    onSuccess: (data: any) => {
      toast.success(`File "${data.filename}" uploaded successfully!`);
      refetch();
      setUploading(false);
    },
    onError: (error: any) => {
      toast.error(`Upload failed: ${error.message}`);
      setUploading(false);
    },
  });

  // Delete file mutation
  const deleteMutation = trpc.files.delete.useMutation({
    onSuccess: (data: any) => {
      toast.success(`File "${data.filename}" deleted successfully!`);
      refetch();
    },
    onError: (error: any) => {
      toast.error(`Delete failed: ${error.message}`);
    },
  });

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size must be less than 50MB");
      return;
    }

    setUploading(true);

    try {
      // Convert file to buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      // Upload file
      await uploadMutation.mutateAsync({
        filename: file.name,
        fileBuffer: Array.from(buffer),
        mimeType: file.type,
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file");
      setUploading(false);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = (fileId: number) => {
    if (confirm("Are you sure you want to delete this file?")) {
      deleteMutation.mutate({ fileId });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You must be logged in to access the file manager</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Please log in to upload and manage your ebook assets.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-sm bg-background/80 border-b border-border">
        <div className="container py-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-wider" style={{ fontFamily: "Garamond, serif" }}>
            WOOF - File Manager
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.name || user?.email}</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-20">
        <div className="container">
          <div className="max-w-4xl">
            {/* Upload Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Ebook Assets
                </CardTitle>
                <CardDescription>
                  Upload your ebook PDF, cover images, and other related files. Max file size: 50MB
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    disabled={uploading}
                    className="cursor-pointer"
                    accept=".pdf,.jpg,.jpeg,.png,.docx,.epub,.txt"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Select File to Upload
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Files List Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <File className="w-5 h-5" />
                  Your Files ({files.length})
                </CardTitle>
                <CardDescription>
                  Manage your uploaded ebook assets and media files
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-accent" />
                  </div>
                ) : files.length === 0 ? (
                  <div className="text-center py-12">
                    <File className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">No files uploaded yet</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload your first file to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {files.map((file: any) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-card/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <File className="h-5 w-5 text-accent flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{file.filename}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatFileSize(file.size)} • {formatDate(file.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <a href={file.url} target="_blank" rel="noopener noreferrer">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-accent hover:bg-accent/10"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </a>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(file.id)}
                            disabled={deleteMutation.isPending}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* File URL Reference */}
            {files.length > 0 && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>File URLs</CardTitle>
                  <CardDescription>
                    Use these URLs to reference your files in your landing page or other content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {files.map((file: any) => (
                      <div key={file.id} className="p-3 bg-card rounded-lg border border-border">
                        <p className="text-sm font-medium mb-2">{file.filename}</p>
                        <code className="text-xs bg-background p-2 rounded block overflow-x-auto break-all">
                          {file.url}
                        </code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
