import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function News() {
  const { user, isAuthenticated } = useAuth();
  const isAdmin = isAuthenticated && user?.role === "admin";

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [aiGenerateThumbnail, setAiGenerateThumbnail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: newsList = [], isLoading, refetch } = trpc.news.list.useQuery();
  const createNewsMutation = trpc.news.create.useMutation({
    onSuccess: () => {
      toast.success("ニュースを投稿しました");
      setTitle("");
      setContent("");
      setAiGenerateThumbnail(false);
      setShowForm(false);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "ニュースの投稿に失敗しました");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("タイトルと本文を入力してください");
      return;
    }

    setIsSubmitting(true);
    try {
      await createNewsMutation.mutateAsync({
        title,
        content,
        aiGenerateThumbnail,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-secondary/5 border-b border-border/40">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">お知らせ</h1>
              <p className="text-lg text-muted-foreground">
                セレキャン合同会社の最新情報をお届けします
              </p>
            </div>
            {isAdmin && (
              <Button
                onClick={() => setShowForm(!showForm)}
                className="group"
              >
                <Plus className="w-4 h-4 mr-2" />
                ニュースを投稿
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Admin Form */}
      {isAdmin && showForm && (
        <section className="py-8 bg-card border-b border-border/40">
          <div className="container max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  タイトル
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ニュースのタイトルを入力"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  本文
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="ニュースの本文を入力"
                  rows={6}
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="aiGenerate"
                  checked={aiGenerateThumbnail}
                  onCheckedChange={(checked) =>
                    setAiGenerateThumbnail(checked as boolean)
                  }
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="aiGenerate"
                  className="text-sm font-medium cursor-pointer"
                >
                  AIでアイキャッチ画像を自動生成
                </label>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="group"
                >
                  {isSubmitting && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  投稿する
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  disabled={isSubmitting}
                >
                  キャンセル
                </Button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* News List */}
      <section className="py-16 md:py-24">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : newsList.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                お知らせはまだありません
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsList.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-border/40 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {item.thumbnailUrl && (
                    <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  {!item.thumbnailUrl && (
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20"></div>
                  )}
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(item.createdAt).toLocaleDateString('ja-JP')}
                    </p>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
