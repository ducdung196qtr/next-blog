import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>⚡ NewsPress</h3>
            <p>Blog tin tức tự động — cập nhật mỗi ngày.</p>
          </div>
          <div className="footer-col">
            <h4>Danh mục</h4>
            <Link href="/category/tin-tuc">Tin tức</Link>
            <Link href="/category/doi-song">Đời sống</Link>
            <Link href="/category/cong-nghe">Công nghệ</Link>
            <Link href="/category/giai-tri">Giải trí</Link>
          </div>
          <div className="footer-col">
            <h4>Liên kết</h4>
            <Link href="/about">Giới thiệu</Link>
            <Link href="/trending">Trending</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} NewsPress. Powered by Next.js & Vercel.</p>
        </div>
      </div>
    </footer>
  );
}
