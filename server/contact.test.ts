import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";

describe("contact.submitMessage", () => {
  it("should submit a valid message successfully", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: { protocol: "https", headers: {} } as any,
      res: {} as any,
    });

    const result = await caller.contact.submitMessage({
      name: "John Doe",
      email: "john@example.com",
      message: "I'm interested in your services.",
    });

    expect(result).toEqual({ success: true });
  });

  it("should reject empty name", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: { protocol: "https", headers: {} } as any,
      res: {} as any,
    });

    try {
      await caller.contact.submitMessage({
        name: "",
        email: "john@example.com",
        message: "I'm interested in your services.",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });

  it("should reject invalid email", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: { protocol: "https", headers: {} } as any,
      res: {} as any,
    });

    try {
      await caller.contact.submitMessage({
        name: "John Doe",
        email: "invalid-email",
        message: "I'm interested in your services.",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });

  it("should reject empty message", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: { protocol: "https", headers: {} } as any,
      res: {} as any,
    });

    try {
      await caller.contact.submitMessage({
        name: "John Doe",
        email: "john@example.com",
        message: "",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });
});
