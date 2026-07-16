// Markdown post utilities
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content/posts');

export function getAllPosts() {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));

  const posts = files.map(filename => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf8');
    const { data, content } = matter(raw);
    const slug = filename.replace('.md', '');
    return { slug, ...data, excerpt: content.slice(0, 200).replace(/[#*`\n]/g, '') };
  });

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  try {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.md`), 'utf8');
    const { data, content } = matter(raw);
    return { slug, ...data, content };
  } catch {
    return null;
  }
}

export function getPostsByCategory(category) {
  return getAllPosts().filter(p => p.category === category);
}

export function getTrendingPosts(limit = 5) {
  return getAllPosts().slice(0, limit);
}
