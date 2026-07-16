import Link from 'next/link';
import Image from 'next/image';

export default function PostCard({ post, variant = 'default' }) {
  const date = new Date(post.date).toLocaleDateString('vi-VN', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  if (variant === 'hero') {
    return (
      <article className="hero-card">
        {post.image && (
          <div className="hero-img">
            <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 60vw" priority />
          </div>
        )}
        <div className="hero-body">
          {post.category && <span className="badge">{post.category}</span>}
          <h2><Link href={`/posts/${post.slug}`}>{post.title}</Link></h2>
          <p className="hero-excerpt">{post.excerpt?.slice(0, 150)}...</p>
          <div className="meta">
            <span>{date}</span>
            {post.author && <span>• {post.author}</span>}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="post-card">
      {post.image && (
        <Link href={`/posts/${post.slug}`} className="card-img">
          <Image src={post.image} alt={post.title} width={600} height={400} />
        </Link>
      )}
      <div className="card-body">
        {post.category && <span className="badge">{post.category}</span>}
        <h3><Link href={`/posts/${post.slug}`}>{post.title}</Link></h3>
        <p className="card-excerpt">{post.excerpt?.slice(0, 100)}...</p>
        <div className="meta">
          <span>{date}</span>
          {post.views && <span>• 👁 {post.views}</span>}
        </div>
      </div>
    </article>
  );
}
