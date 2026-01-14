import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function Footer() {
  const { isAuthenticated, logout, user } = useAuth();
  const currentYear = new Date().getFullYear();

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated && user?.role === "admin") {
      window.location.href = "/news";
    } else {
      window.location.href = getLoginUrl();
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">セレキャン合同会社</h3>
            <p className="text-sm opacity-90">
              大学生と企業をつなぎ、キャリア形成を支援する事業を展開しています。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">ナビゲーション</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  トップページ
                </Link>
              </li>
              <li>
                <Link href="/company" className="hover:underline">
                  会社情報
                </Link>
              </li>
              <li>
                <Link href="/ceo-message" className="hover:underline">
                  代表者メッセージ
                </Link>
              </li>
              <li>
                <Link href="/business" className="hover:underline">
                  事業内容
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:underline">
                  お知らせ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">お問合せ</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:underline">
                  お問合せフォーム
                </Link>
              </li>
              <li>
                <a href="mailto:info@cele-can.jp" className="hover:underline">
                  メール
                </a>
              </li>
            </ul>
          </div>


        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <p className="text-center text-xs opacity-60">
              &copy; {currentYear} セレキャン合同会社. All rights reserved.
            </p>
            <span className="text-xs opacity-40">|</span>
            <a href="#" className="text-xs opacity-60 hover:opacity-100 transition-opacity" onClick={handleAdminClick}>
              管理画面
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
