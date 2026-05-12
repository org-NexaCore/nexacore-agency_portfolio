import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, adminProcedure } from "./_core/trpc";
import { createMessage, getAllMessages, markMessageAsRead, deleteMessage } from "./db";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
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

  contact: router({
    submitMessage: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Invalid email"),
          message: z.string().min(1, "Message is required"),
        })
      )
      .mutation(async ({ input }) => {
        await createMessage({
          name: input.name,
          email: input.email,
          message: input.message,
          read: 0,
        });
        return { success: true };
      }),
    getMessages: adminProcedure.query(async () => {
      return await getAllMessages();
    }),
    markAsRead: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await markMessageAsRead(input.id);
        return { success: true };
      }),
    deleteMessage: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteMessage(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
