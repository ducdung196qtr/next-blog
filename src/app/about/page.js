export default function AboutPage() {
  return (
    <main className="container page-content">
      <h1 className="section-title">📖 Giới thiệu</h1>
      
      <div className="post-content">
        <p>
          <strong>NewsPress</strong> là blog tin tức tự động — cập nhật tin nóng từ Việt Nam 
          và thế giới mỗi ngày. Được vận hành bởi AI, blog tự động thu thập, viết lại và 
          đăng tải các bài viết mới nhất.
        </p>

        <h2>Tính năng</h2>
        <ul>
          <li>🔄 Tự động cập nhật tin tức mỗi ngày</li>
          <li>🌙 Dark mode tự động</li>
          <li>📱 Responsive — đọc tốt trên mọi thiết bị</li>
          <li>⚡ Tốc độ nhanh — chạy trên Vercel CDN toàn cầu</li>
          <li>🔍 SEO tối ưu</li>
        </ul>

        <h2>Công nghệ</h2>
        <ul>
          <li>⚛️ Next.js 15 (React)</li>
          <li>📝 Markdown content</li>
          <li>🚀 Deploy trên Vercel</li>
          <li>🤖 Auto-post bởi AI</li>
        </ul>
      </div>
    </main>
  );
}
