'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="site-logo">
          <span className="logo-icon">N</span>
          <span>NewsPress</span>
        </Link>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Trang chủ</Link>
          <Link href="/category/tin-tuc" onClick={() => setMenuOpen(false)}>Tin tức</Link>
          <Link href="/category/doi-song" onClick={() => setMenuOpen(false)}>Đời sống</Link>
          <Link href="/category/cong-nghe" onClick={() => setMenuOpen(false)}>Công nghệ</Link>
          <Link href="/category/giai-tri" onClick={() => setMenuOpen(false)}>Giải trí</Link>
          <Link href="/trending" onClick={() => setMenuOpen(false)}>🔥 Trending</Link>
        </nav>

        <div className="header-actions">
          <button
            className="icon-btn dark-toggle"
            onClick={toggleDark}
            aria-label={dark ? 'Chuyển sáng' : 'Chuyển tối'}
            title={dark ? 'Chế độ sáng' : 'Chế độ tối'}
          >
            {dark ? '☀️' : '🌙'}
          </button>
          <button
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
