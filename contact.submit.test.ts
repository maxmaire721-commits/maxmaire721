import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database and notification functions
vi.mock("./db", () => ({
  createContact: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits contact form with valid data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "山田太郎",
      email: "yamada@example.com",
      subject: "広告出稿についてのご相談",
      message: "貴社の広告サービスについてお問い合わせしたいのですが...",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects invalid email format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "山田太郎",
        email: "invalid-email",
        subject: "お問い合わせ",
        message: "メッセージ",
      })
    ).rejects.toThrow();
  });

  it("rejects empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "",
        email: "yamada@example.com",
        subject: "お問い合わせ",
        message: "メッセージ",
      })
    ).rejects.toThrow();
  });

  it("rejects empty message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "山田太郎",
        email: "yamada@example.com",
        subject: "お問い合わせ",
        message: "",
      })
    ).rejects.toThrow();
  });
});
