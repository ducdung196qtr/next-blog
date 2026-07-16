import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export default function HomePage() {
  const allPosts = getAllPosts();
  const heroPost = allPosts[0];
  const secondaryPosts = allPosts.slice(1, 3);
  const gridPosts = allPosts.slice(3, 12);

  return (
    <>
      {/* Breaking news */}
      <div className="breaking-bar">
        <div className="container">
          <span className="breaking-label">BREAKING</span>
          <div className="breaking-text">
            {allPosts.slice(0, 5).map(p => (
              <Link key={p.slug} href={`/posts/${p.slug}`}>{p.title}</Link>
            ))}
          </div>
        </div>
      </div>

      <main className="container" style={{ paddingTop: 32, paddingBottom: 40 }}>
        {/* Hero section */}
        {heroPost && (
          <section className="hero-section">
            <PostCard post={heroPost} variant="hero" />

            {secondaryPosts.map(post => (
              <article key={post.slug} className="hero-secondary">
                {post.image && (
                  <div className="thumb">
                    <Image src={post.image} alt={post.title} fill sizes="120px" />
                  </div>
                )}
                <div className="info">
                  {post.category && <span className="badge">{post.category}</span>}
                  <h4><Link href={`/posts/${post.slug}`}>{post.title}</Link></h4>
                  <div className="meta">
                    <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

        {/* Latest grid */}
        <h2 className="section-title">📰 Tin mới nhất</h2>
        <div className="post-grid">
          {gridPosts.length > 0 ? (
            gridPosts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))
          ) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 60, color: 'var(--text-secondary)' }}>
              <p style={{ fontSize: 48, marginBottom: 16 }}>📝</p>
              <h3>Chưa có bài viết nào</h3>
              <p>Blog sẽ tự động cập nhật khi có bài viết mới.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
