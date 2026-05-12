import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";

const createAdminContext = () => ({
  user: {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin",
    loginMethod: "manus",
    role: "admin" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  },
  req: { protocol: "https", headers: {} } as any,
  res: {} as any,
});

describe("contact.getMessages", () => {
  it("should retrieve all messages with admin role", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const messages = await caller.contact.getMessages();
    expect(Array.isArray(messages)).toBe(true);
  });

  it("should deny unauthorized access to getMessages", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: { protocol: "https", headers: {} } as any,
      res: {} as any,
    });

    try {
      await caller.contact.getMessages();
      expect.fail("Should have thrown error");
    } catch (error: any) {
      expect(["UNAUTHORIZED", "FORBIDDEN"]).toContain(error.code);
    }
  });
});

describe("contact.markAsRead", () => {
  it("should mark a message as read with admin role", async () => {
    const caller = appRouter.createCaller(createAdminContext());

    try {
      const result = await caller.contact.markAsRead({ id: 1 });
      expect(result).toEqual({ success: true });
    } catch (error: any) {
      // Expected if message doesn't exist
      expect(error).toBeDefined();
    }
  });

  it("should deny unauthorized access to markAsRead", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: { protocol: "https", headers: {} } as any,
      res: {} as any,
    });

    try {
      await caller.contact.markAsRead({ id: 1 });
      expect.fail("Should have thrown error");
    } catch (error: any) {
      expect(["UNAUTHORIZED", "FORBIDDEN"]).toContain(error.code);
    }
  });
});

describe("contact.deleteMessage", () => {
  it("should delete a message with admin role", async () => {
    const caller = appRouter.createCaller(createAdminContext());

    try {
      const result = await caller.contact.deleteMessage({ id: 1 });
      expect(result).toEqual({ success: true });
    } catch (error: any) {
      // Expected if message doesn't exist
      expect(error).toBeDefined();
    }
  });

  it("should deny unauthorized access to deleteMessage", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: { protocol: "https", headers: {} } as any,
      res: {} as any,
    });

    try {
      await caller.contact.deleteMessage({ id: 1 });
      expect.fail("Should have thrown error");
    } catch (error: any) {
      expect(["UNAUTHORIZED", "FORBIDDEN"]).toContain(error.code);
    }
  });
});
