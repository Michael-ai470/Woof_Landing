import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createFile, getUserFiles, deleteFile } from "./db";
import { storagePut } from "./storage";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  files: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await getUserFiles(ctx.user.id);
    }),
    upload: protectedProcedure
      .input(
        z.object({
          filename: z.string(),
          fileBuffer: z.array(z.number()),
          mimeType: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const buffer = Buffer.from(input.fileBuffer);
        const fileKey = `users/${ctx.user.id}/files/${Date.now()}-${input.filename}`;

        const { url } = await storagePut(fileKey, buffer, input.mimeType);

        const file = await createFile({
          userId: ctx.user.id,
          filename: input.filename,
          fileKey,
          url,
          mimeType: input.mimeType,
          size: buffer.length,
        });

        return {
          id: (file as any).insertId,
          filename: input.filename,
          url,
          size: buffer.length,
        };
      }),
    delete: protectedProcedure
      .input(z.object({ fileId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const userFiles = await getUserFiles(ctx.user.id);
        const file = userFiles.find((f) => f.id === input.fileId);

        if (!file) {
          throw new Error("File not found or unauthorized");
        }

        await deleteFile(input.fileId, ctx.user.id);

        return {
          id: file.id,
          filename: file.filename,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
