import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success("お問合せを送信しました");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    },
    onError: (error) => {
      toast.error(error.message || "送信に失敗しました");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      toast.error("すべての必須項目を入力してください");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("有効なメールアドレスを入力してください");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitMutation.mutateAsync(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-secondary/5 border-b border-border/40">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">お問合せ</h1>
          <p className="text-lg text-muted-foreground">
            ご質問やご相談がございましたら、お気軽にお問合せください
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          {submitted && (
            <div className="mb-8 p-6 rounded-lg bg-green-50 border border-green-200 flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 mb-1">
                  お問合せを受け付けました
                </h3>
                <p className="text-sm text-green-800">
                  ご送信いただきありがとうございます。
                  確認後、担当者からご連絡させていただきます。
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                お名前 <span className="text-destructive">*</span>
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="例：山田太郎"
                disabled={isSubmitting}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                メールアドレス <span className="text-destructive">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="例：yamada@example.com"
                disabled={isSubmitting}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                電話番号
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="例：090-1234-5678"
                disabled={isSubmitting}
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                件名 <span className="text-destructive">*</span>
              </label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="例：広告出稿についてのご相談"
                disabled={isSubmitting}
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                メッセージ <span className="text-destructive">*</span>
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="ご質問やご相談の内容をお書きください"
                rows={8}
                disabled={isSubmitting}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="group"
              >
                {isSubmitting && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                送信する
              </Button>
              <Button
                type="reset"
                size="lg"
                variant="outline"
                disabled={isSubmitting}
                onClick={() =>
                  setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
                }
              >
                リセット
              </Button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-12 p-8 rounded-lg bg-muted/30 border border-border/40">
            <h3 className="text-xl font-bold mb-4">その他のお問合せ方法</h3>
            <p className="text-muted-foreground mb-4">
              お急ぎの場合は、以下の方法でもお問合せいただけます。
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <strong>メール：</strong>
                <a
                  href="mailto:info@cele-can.jp"
                  className="text-primary hover:underline ml-2"
                >
                  info@cele-can.jp
                </a>
              </li>
              <li>
                <strong>電話：</strong> お問合せフォームからご連絡ください
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-card border-t border-border/40">
        <div className="container max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            よくあるご質問
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "広告出稿にはどのくらいの期間が必要ですか？",
                a: "通常、申し込みから1～2週間程度で出稿開始可能です。詳しくはお問合せください。",
              },
              {
                q: "複数の大学での広告出稿は可能ですか？",
                a: "はい、複数の大学での出稿に対応しています。詳しくはお問合せください。",
              },
              {
                q: "キャリア形成事業の対象学年は？",
                a: "全学年対象です。学生のキャリア段階に応じたプログラムをご提案します。",
              },
              {
                q: "費用についての詳細は？",
                a: "事業内容や規模によって異なります。お問合せいただければ、詳しくご説明します。",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border border-border/40 hover:border-primary/40 transition-colors"
              >
                <h3 className="font-bold text-lg mb-3 text-primary">
                  Q: {faq.q}
                </h3>
                <p className="text-muted-foreground">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
