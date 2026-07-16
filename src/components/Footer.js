import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>⚡ NewsPress</h2>
            <p>Blog tin tức chuyên sâu — cập nhật những góc nhìn mới nhất về công nghệ, đời sống, giải trí tại Việt Nam và thế giới.</p>
          </div>
          <div className="footer-col">
            <h4>Danh mục</h4>
            <ul>
              <li><Link href="/category/tin-tuc">Tin tức</Link></li>
              <li><Link href="/category/doi-song">Đời sống</Link></li>
              <li><Link href="/category/cong-nghe">Công nghệ</Link></li>
              <li><Link href="/category/giai-tri">Giải trí</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Về chúng tôi</h4>
            <ul>
              <li><Link href="/about">Giới thiệu</Link></li>
              <li><Link href="/trending">Trending</Link></li>
              <li><Link href="/">Trang chủ</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Liên hệ</h4>
            <ul>
              <li>📧 contact@newspress.vn</li>
              <li>📍 Việt Nam</li>
              <li>🌐 Theo dõi chúng tôi</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} NewsPress. Tác giả: <strong>Đức Dũng</strong>. Mọi quyền được bảo lưu.</p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="YouTube">▶️</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
