import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Users, Newspaper } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const { data: newsArticles, isLoading } = trpc.news.list.useQuery();

  // Get only the first 3 articles
  const displayedArticles = newsArticles?.slice(0, 3) ?? [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url(/hero-image.png)'}}></div>
        <div className="absolute inset-0 bg-white/52"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-black">
              豊かな社会のために
              <br />
              多くのきっかけを
            </h1>
            <p className="text-lg md:text-xl text-black mb-8 max-w-2xl">
              セレキャン合同会社は、大学生と企業をつなぎ、キャリア形成を支援します。
              広告事業とキャリア形成事業を通じて、学生と企業の双方にとって価値あるきっかけを初造します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/company">
                <Button size="lg" className="group">
                  会社について詳しく
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  お問合せ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 md:py-24 bg-card border-y border-border/40">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">ビジョン</h2>
            <p className="text-lg text-muted-foreground mb-8">
              すべての学生に可能性を最大限に発揮でき、様々な選択肢の中から将来を描き日本の将来を創造する若者支援に貢献します。
            </p>
            <div className="inline-block px-6 py-3 bg-primary/10 rounded-lg whitespace-nowrap">
              <p className="text-primary font-semibold">
                可能性の発見支援×可能性への行動支援
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Overview */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">事業内容</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Advertising Business */}
            <Link href="/business" className="group block rounded-lg border border-border/40 p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Newspaper className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">広告事業</h3>
              <p className="text-muted-foreground mb-4">
                大学の生協や学食にPOP広告を配置し、企業と学生を直接つなぐ広告媒体を提供します。
              </p>
              <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                詳しく見る
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            {/* Career Formation Business */}
            <Link href="/business" className="group block rounded-lg border border-border/40 p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">キャリア形成事業</h3>
              <p className="text-muted-foreground mb-4">
                企業の协賛のもと、大学生が将来や自分自身を知り、能動的にキャリアを形成できるキャリア形成をサポートします。
              </p>
              <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                詳しく見る
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold whitespace-nowrap">最新のお知らせ</h2>
            <Link href="/news">
              <Button variant="outline">
                すべて見る
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="md:col-span-3 text-center py-8 text-muted-foreground">
                読み込み中...
              </div>
            ) : displayedArticles.length > 0 ? (
              displayedArticles.map((article) => (
                <Link key={article.id} href="/news" className="group block">
                  <div className="rounded-lg border border-border/40 overflow-hidden hover:shadow-lg transition-shadow h-full">
                    {article.thumbnailUrl && (
                      <div className="aspect-video bg-cover bg-center" style={{backgroundImage: `url(${article.thumbnailUrl})`}}></div>
                    )}
                    <div className="p-6">
                      <p className="text-sm text-muted-foreground mb-2">
                        {new Date(article.createdAt).toLocaleDateString('ja-JP')}
                      </p>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {article.content.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="md:col-span-3 text-center py-8 text-muted-foreground">
                現在、お知らせはありません。
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">よくある質問</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 rounded-lg border border-border/40 hover:border-primary/40 transition-colors">
              <h3 className="text-lg font-bold mb-3 text-primary">Q: 広告出稿にはどのくらいの期間が必要ですか？</h3>
              <p className="text-muted-foreground">A: 問合せフォームより、お問い合わせください。</p>
            </div>
            <div className="p-6 rounded-lg border border-border/40 hover:border-primary/40 transition-colors">
              <h3 className="text-lg font-bold mb-3 text-primary">Q: 複数の大学での広告出稿は可能ですか？</h3>
              <p className="text-muted-foreground">A: はい、複数の大学での出稿に対応しています。詳しくはお問合せください。</p>
            </div>
            <div className="p-6 rounded-lg border border-border/40 hover:border-primary/40 transition-colors">
              <h3 className="text-lg font-bold mb-3 text-primary">Q: キャリア形成事業の対象学年は？</h3>
              <p className="text-muted-foreground">A: 全学年対象です。学生のキャリア段階に応じたプログラムをご提案します。</p>
            </div>
            <div className="p-6 rounded-lg border border-border/40 hover:border-primary/40 transition-colors">
              <h3 className="text-lg font-bold mb-3 text-primary">Q: キャリア形成プログラムの参加条件は？</h3>
              <p className="text-muted-foreground">A: 学生のキャリア形成を第一に考えている趣旨にご賛同くださる企業様になります。就労型や直接的に採用活動を対象にしていません。</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            一緒に未来を創造しませんか？
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            セレキャン合同会社では、企業様や学生の皆様からのご相談をお待ちしています。
            ご質問やご不明な点がございましたら、お気軽にお問合せください。
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
