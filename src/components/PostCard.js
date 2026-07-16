import Link from 'next/link';

export default function PostCard({ post, variant = 'default' }) {
  const date = new Date(post.date).toLocaleDateString('vi-VN', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  if (variant === 'hero') {
    return (
      <article className="hero-main">
        {post.image && (
          <div className="hero-main-img">
            <img src={post.image} alt={post.title} />
            <div className="hero-main-overlay" />
          </div>
        )}
        <div className="hero-main-body">
          {post.category && <span className="category-tag">{post.category}</span>}
          <h2><Link href={`/posts/${post.slug}`}>{post.title}</Link></h2>
          <p>{post.excerpt}</p>
          <div className="byline">
            {post.author} &bull; {date}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="post-card">
      {post.image && (
        <Link href={`/posts/${post.slug}`} className="card-img">
          <img src={post.image} alt={post.title} loading="lazy" />
        </Link>
      )}
      <div className="card-body">
        {post.category && <span className="category-tag">{post.category}</span>}
        <h3><Link href={`/posts/${post.slug}`}>{post.title}</Link></h3>
        <p>{post.excerpt}</p>
        <div className="card-footer">
          <span>{date}</span>
          <span>{post.author}</span>
        </div>
      </div>
    </article>
  );
}
