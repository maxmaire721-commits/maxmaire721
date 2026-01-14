import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, Users, Award } from "lucide-react";

export default function Business() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-secondary/5 border-b border-border/40">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">事業内容</h1>
          <p className="text-lg text-muted-foreground">
            セレキャン合同会社の2つの主要事業についてご紹介します
          </p>
        </div>
      </section>

      {/* Business 1: Advertising */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              広告事業
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              大学の学食に広告を配置し、学生×企業の接点を創出します。食事時間約30分の中での立体広告は既存の大学内広告よりも高い効果が期待できます。また、広告内容についても、デザイン等を含めて、コンサルティングを行います。
            </p>

            <h3 className="text-xl font-bold mb-4">特徴</h3>
            <ul className="space-y-3 mb-8">
              {[
                "大学内の高いターゲット精度",
                "学生との直接的な接点",
                "複数大学での展開可能",
                "柔軟な広告期間設定",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/contact">
              <Button className="group">
                広告出稿のご相談
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Business 2: Career Formation */}
      <section className="py-16 md:py-24 bg-card border-y border-border/40">
        <div className="container">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              キャリア形成事業
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              大学生と企業のマッチングを通じて、学生のキャリア形成を支援します。早期化や売り手市場が進む今の時代だからこそ、「本当にやりたいこと」「将来について考える力」を採用活動に左右されずに養うことができるプログラムを提供します。
            </p>

            <h3 className="text-xl font-bold mb-4">プログラム内容</h3>
            <ul className="space-y-3 mb-8">
              {[
                "新商品開発プログラム",
                "販売促進プログラム",
                "サービス向上プログラム",
                "地域活性化プログラム",
                "知名度促進プログラム",
              ].map((service) => (
                <li key={service} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{service}</span>
                </li>
              ))}
            </ul>

            <Link href="/contact">
              <Button variant="outline" className="group">
                キャリア形成事業についてのご相談
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Selecan */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            セレキャンを選ぶ理由
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
            {
              title: "高いターゲット精度",
              description:
                "愛知県を中心に行っているため、学生・企業趣向を地域特性に合わせてコンサルティングします。",
            },
            {
              title: "双方向のメリット",
              description:
                "企業の採用課題解決と学生のキャリア形成の両立を実現します。学生は将来やりたいことや自分の適性が見つかり、企業はZ世代による新たなアイデアやプログラム企画向上のヒントが得られます。",
            },
            {
              title: "充実したサポート",
              description:
                "導入から運用まで、専任チームがサポートいたします。",
            },
            ].map((benefit) => (
              <div
                key={benefit.title}
                className="p-8 rounded-lg border border-border/40 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
  
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
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
