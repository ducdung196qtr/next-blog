import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/posts';

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Không tìm thấy' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.image ? { images: [post.image] } : {},
  };
}

export default function PostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString('vi-VN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <main className="container">
      <article className="post-article">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/">Trang chủ</Link>
          <span className="sep">/</span>
          {post.category && (
            <>
              <Link href={`/category/${post.category.toLowerCase().replace(/\s/g, '-')}`}>
                {post.category}
              </Link>
              <span className="sep">/</span>
            </>
          )}
          <span>{post.title}</span>
        </nav>

        {/* Header */}
        <header className="post-header">
          {post.category && <span className="badge">{post.category}</span>}
          <h1>{post.title}</h1>
          <div className="meta" style={{ gap: 16 }}>
            <span>📅 {date}</span>
            {post.author && <span>✍️ {post.author}</span>}
            {post.readingTime && <span>⏱️ {post.readingTime}</span>}
          </div>
        </header>

        {/* Featured image */}
        {post.image && (
          <div className="post-featured">
            <img src={post.image} alt={post.title} className="featured-img" />
          </div>
        )}

        {/* Content */}
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: convertMarkdown(post.content) }}
        />
      </article>
    </main>
  );
}

// Simple Markdown → HTML converter (no external deps)
function convertMarkdown(md) {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" />')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, (match) => {
      if (match.startsWith('<')) return match;
      return `<p>${match}</p>`;
    });
}
