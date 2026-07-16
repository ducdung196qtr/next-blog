import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export default function TrendingPage() {
  const posts = getAllPosts().slice(0, 10);

  return (
    <main className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h1 className="section-title">🔥 Trending</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
        Những bài viết được xem nhiều nhất tuần này.
      </p>

      {posts.length > 0 ? (
        <div className="post-grid">
          {posts.map(post => <PostCard key={post.slug} post={post} />)}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: 48 }}>📊</p>
          <h3>Chưa có dữ liệu</h3>
        </div>
      )}
    </main>
  );
}
