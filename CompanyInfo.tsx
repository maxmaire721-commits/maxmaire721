import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CompanyInfo() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-secondary/5 border-b border-border/40">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">会社情報</h1>
          <p className="text-lg text-muted-foreground">
            セレキャン合同会社についてご紹介します
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                セレキャンについて
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                セレキャン合同会社は、大学生と企業をつなぎ、
                キャリア形成を支援する企業です。
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                広告事業とキャリア形成事業の2つの事業を通じて、
                学生の成長と企業の発展に貢献しています。
              </p>
              <p className="text-lg text-muted-foreground">
                私たちは、すべての学生が自分の可能性を最大限に発揮できる
                環境を作ることを目指しています。
              </p>
            </div>
            <div>
              <p className="text-lg text-muted-foreground mb-4">
                企業の协賛のもと、大学生が将来や自分自身を知り、能動的にキャリアを形成できるキャリア形成をサポートします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-card border-y border-border/40">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            ミッション・ビジョン
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="p-8 rounded-lg border border-border/40">
              <h3 className="text-2xl font-bold mb-4 text-primary">ミッション</h3>
              <p className="text-lg text-muted-foreground">
                大学生と企業の架け橋となり、それぞれの成長を支援することで、
                より良い未来社会の実現に貢献します。
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 rounded-lg border border-border/40">
              <h3 className="text-2xl font-bold mb-4 text-secondary">ビジョン</h3>
              <p className="text-lg text-muted-foreground">
                すべての学生が自分の可能性を最大限に発揮でき、
                企業が優秀な人材を確保できる社会を実現します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Details */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">会社概要</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-border/40">
                  <td className="py-4 px-4 font-semibold text-primary w-32">
                    会社名
                  </td>
                  <td className="py-4 px-4">セレキャン合同会社</td>
                </tr>
                <tr className="border-b border-border/40">
                  <td className="py-4 px-4 font-semibold text-primary">
                    代表
                  </td>
                  <td className="py-4 px-4">新美竣也</td>
                </tr>
                <tr className="border-b border-border/40">
                  <td className="py-4 px-4 font-semibold text-primary">
                    事業内容
                  </td>
                  <td className="py-4 px-4">
                    <ul className="list-disc list-inside space-y-1">
                      <li>大学内広告事業</li>
                      <li>キャリア形成事業</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ご質問やご相談はお気軽に
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            セレキャン合同会社についてのご質問や、
            事業に関するご相談がございましたら、
            お気軽にお問合せください。
          </p>
          <Link href="/contact">
            <Button size="lg" className="group">
              お問合せフォームへ
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
