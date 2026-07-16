import Link from 'next/link';
import { getPostsByCategory } from '@/lib/posts';
import PostCard from '@/components/PostCard';

// Map URL slug back to Vietnamese category name
const CATEGORY_MAP = {
  'tin-tuc': 'Tin tức',
  'doi-song': 'Đời sống',
  'cong-nghe': 'Công nghệ',
  'giai-tri': 'Giải trí',
  'the-thao': 'Thể thao',
};

export async function generateMetadata({ params }) {
  const catName = CATEGORY_MAP[params.category] || params.category;
  return { title: `${catName} — NewsPress` };
}

export default function CategoryPage({ params }) {
  const catName = CATEGORY_MAP[params.category] || params.category;
  const posts = getPostsByCategory(catName);

  return (
    <main className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <nav className="breadcrumb">
        <Link href="/">Trang chủ</Link>
        <span className="sep">/</span>
        <span>{catName}</span>
      </nav>
      <h1 className="section-title">📂 {catName}</h1>

      {posts.length > 0 ? (
        <div className="post-grid">
          {posts.map(post => <PostCard key={post.slug} post={post} />)}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: 48 }}>📭</p>
          <h3>Chưa có bài viết nào</h3>
        </div>
      )}
    </main>
  );
}
