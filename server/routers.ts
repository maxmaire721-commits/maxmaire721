import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { createNews, updateNews, deleteNews, getPublishedNews, createContact, getNewsById } from "./db";
import { generateImage } from "./_core/imageGeneration";
import { notifyOwner } from "./_core/notification";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

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

  news: router({
    list: publicProcedure.query(() => getPublishedNews()),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getNewsById(input.id)),
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1).max(255),
        content: z.string().min(1),
        aiGenerateThumbnail: z.boolean().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Only admins can create news
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }

        let thumbnailUrl: string | undefined;
        if (input.aiGenerateThumbnail) {
          try {
            const imageResult = await generateImage({
              prompt: `Professional news thumbnail for: ${input.title}. Elegant corporate style, modern design.`,
            });
            thumbnailUrl = imageResult.url;
          } catch (error) {
            console.error('[News] Failed to generate thumbnail:', error);
            // Continue without thumbnail if generation fails
          }
        }

        await createNews({
          title: input.title,
          content: input.content,
          thumbnailUrl,
          authorId: ctx.user.id,
          published: 1,
        });

        return { success: true };
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1).max(255).optional(),
        content: z.string().min(1).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }
        await updateNews(input.id, {
          title: input.title,
          content: input.content,
        });
        return { success: true };
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }
        await deleteNews(input.id);
        return { success: true };
      }),
    listAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      return getPublishedNews();
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1).max(255),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().min(1).max(255),
        message: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        await createContact({
          name: input.name,
          email: input.email,
          phone: input.phone,
          subject: input.subject,
          message: input.message,
        });

        // Notify owner about new contact
        try {
          const phoneInfo = input.phone ? `\n電話番号: ${input.phone}` : '';
          await notifyOwner({
            title: `新しいお問合せ: ${input.subject}`,
            content: `${input.name} (${input.email})${phoneInfo} からお問合せがありました。\n\nメッセージ:\n${input.message}`,
          });
        } catch (error) {
          console.error('[Contact] Failed to notify owner:', error);
          // Don't fail the submission if notification fails
        }

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
