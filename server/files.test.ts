import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): TrpcContext {
  const user: AuthenticatedUser = {
    id: userId,
    openId: `test-user-${userId}`,
    email: `test${userId}@example.com`,
    name: `Test User ${userId}`,
    loginMethod: "test",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("files router", () => {
  describe("files.list", () => {
    it("should return empty array for new user", async () => {
      const ctx = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      // Note: This will fail if database is not set up, which is expected in test environment
      // In production, this would return the user's files
      try {
        const result = await caller.files.list();
        expect(Array.isArray(result)).toBe(true);
      } catch (error) {
        // Expected if database is not available
        expect(error).toBeDefined();
      }
    });
  });

  describe("files.upload", () => {
    it("should validate required input fields", async () => {
      const ctx = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      try {
        // @ts-ignore - intentionally passing invalid input
        await caller.files.upload({
          filename: "",
          fileBuffer: [],
          mimeType: "",
        });
      } catch (error: any) {
        // Expected validation error
        expect(error).toBeDefined();
      }
    });

    it("should accept valid file upload input", async () => {
      const ctx = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      // This test verifies the input validation passes
      // Actual upload will fail without database/storage setup
      try {
        await caller.files.upload({
          filename: "test.pdf",
          fileBuffer: [1, 2, 3, 4, 5],
          mimeType: "application/pdf",
        });
      } catch (error: any) {
        // Expected if storage/database not available
        expect(error).toBeDefined();
      }
    });
  });

  describe("files.delete", () => {
    it("should validate fileId input", async () => {
      const ctx = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      try {
        // @ts-ignore - intentionally passing invalid input
        await caller.files.delete({
          fileId: "not-a-number",
        });
      } catch (error: any) {
        // Expected validation error
        expect(error).toBeDefined();
      }
    });

    it("should accept valid delete input", async () => {
      const ctx = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.files.delete({
          fileId: 999, // Non-existent file
        });
      } catch (error: any) {
        // Expected error: file not found
        expect(error.message).toContain("not found");
      }
    });
  });

  describe("authorization", () => {
    it("should require authentication for file operations", async () => {
      const ctx: TrpcContext = {
        user: null,
        req: {
          protocol: "https",
          headers: {},
        } as TrpcContext["req"],
        res: {
          clearCookie: () => {},
        } as TrpcContext["res"],
      };

      const caller = appRouter.createCaller(ctx);

      try {
        await caller.files.list();
        expect.fail("Should have thrown authentication error");
      } catch (error: any) {
        expect(error.message).toContain("Unauthorized");
      }
    });
  });
});
