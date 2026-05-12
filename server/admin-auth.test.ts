import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("Admin Authorization", () => {
  const createAdminContext = (): TrpcContext => ({
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@example.com",
      name: "Admin User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  });

  const createUserContext = (): TrpcContext => ({
    user: {
      id: 2,
      openId: "regular-user",
      email: "user@example.com",
      name: "Regular User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  });

  const createUnauthContext = (): TrpcContext => ({
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  });

  describe("contact.getMessages", () => {
    it("should allow admin to get messages", async () => {
      const caller = appRouter.createCaller(createAdminContext());
      const messages = await caller.contact.getMessages();
      expect(Array.isArray(messages)).toBe(true);
    });

    it("should deny regular user from getting messages", async () => {
      const caller = appRouter.createCaller(createUserContext());
      try {
        await caller.contact.getMessages();
        expect.fail("Should have thrown FORBIDDEN error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });

    it("should deny unauthenticated user from getting messages", async () => {
      const caller = appRouter.createCaller(createUnauthContext());
      try {
        await caller.contact.getMessages();
        expect.fail("Should have thrown error");
      } catch (error: any) {
        expect(["UNAUTHORIZED", "FORBIDDEN"]).toContain(error.code);
      }
    });
  });

  describe("contact.markAsRead", () => {
    it("should allow admin to mark message as read", async () => {
      const caller = appRouter.createCaller(createAdminContext());
      try {
        const result = await caller.contact.markAsRead({ id: 999 });
        expect(result).toEqual({ success: true });
      } catch (error: any) {
        // Database error is OK, authorization passed
        expect(error.code).not.toBe("FORBIDDEN");
        expect(error.code).not.toBe("UNAUTHORIZED");
      }
    });

    it("should deny regular user from marking message as read", async () => {
      const caller = appRouter.createCaller(createUserContext());
      try {
        await caller.contact.markAsRead({ id: 1 });
        expect.fail("Should have thrown FORBIDDEN error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });

    it("should deny unauthenticated user from marking message as read", async () => {
      const caller = appRouter.createCaller(createUnauthContext());
      try {
        await caller.contact.markAsRead({ id: 1 });
        expect.fail("Should have thrown error");
      } catch (error: any) {
        expect(["UNAUTHORIZED", "FORBIDDEN"]).toContain(error.code);
      }
    });
  });

  describe("contact.deleteMessage", () => {
    it("should allow admin to delete message", async () => {
      const caller = appRouter.createCaller(createAdminContext());
      try {
        const result = await caller.contact.deleteMessage({ id: 999 });
        expect(result).toEqual({ success: true });
      } catch (error: any) {
        // Database error is OK, authorization passed
        expect(error.code).not.toBe("FORBIDDEN");
        expect(error.code).not.toBe("UNAUTHORIZED");
      }
    });

    it("should deny regular user from deleting message", async () => {
      const caller = appRouter.createCaller(createUserContext());
      try {
        await caller.contact.deleteMessage({ id: 1 });
        expect.fail("Should have thrown FORBIDDEN error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });

    it("should deny unauthenticated user from deleting message", async () => {
      const caller = appRouter.createCaller(createUnauthContext());
      try {
        await caller.contact.deleteMessage({ id: 1 });
        expect.fail("Should have thrown error");
      } catch (error: any) {
        expect(["UNAUTHORIZED", "FORBIDDEN"]).toContain(error.code);
      }
    });
  });
});
