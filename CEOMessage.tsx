import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CEOMessage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-secondary/5 border-b border-border/40">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">代表者メッセージ</h1>
          <p className="text-lg text-muted-foreground">
            セレキャン合同会社からのメッセージ
          </p>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Message Content */}
            <div className="flex-1">
              <p className="text-lg text-black leading-relaxed mb-6">
                大学生と企業をつなぎ、キャリア形成を支援する事業を通じて、より良い未来社会の実現に貢献したいという思いからセレキャン合同会社を設立しました。
              </p>
              <p className="text-lg text-black leading-relaxed mb-6">
                私たちが提供する広告事業とキャリア形成事業は、単なるビジネスではなく、学生と企業の両者にとって真の価値を創造することを目指しています。学生が自分の可能性を発見し、企業が新しいアイデアや人材に出会える場を提供することで、社会全体の活性化につながると信じています。
              </p>
              <p className="text-lg text-black leading-relaxed mb-8">
                大学の信頼を担保しながら、学生と企業の成長を実現する。これが私たちのミッションです。皆様と一緒に、豊かな社会のための多くのきっかけを創造していきたいと考えています。
              </p>
              <p className="text-center text-sm text-muted-foreground mt-8 mb-8">
                新美竣也
              </p>

              <Link href="/contact">
                <Button className="group">
                  ご相談・お問合せ
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            事業についてのご相談
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            広告事業またはキャリア形成事業についてのご相談、
            ご質問がございましたら、お気軽にお問合せください。
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              variant="secondary"
              className="group"
            >
              お問合せフォームへ
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
