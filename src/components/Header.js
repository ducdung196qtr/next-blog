'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (!saved && prefersDark);
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <Link href="/" className="site-logo">
          ⚡ <span>NewsPress</span>
        </Link>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          <Link href="/">Trang chủ</Link>
          <Link href="/trending">🔥 Trending</Link>
          <Link href="/category/tin-tuc">Tin tức</Link>
          <Link href="/category/doi-song">Đời sống</Link>
          <Link href="/about">Giới thiệu</Link>
        </nav>

        <div className="header-actions">
          <button onClick={toggleDark} className="icon-btn" aria-label="Toggle dark mode">
            {dark ? '☀️' : '🌙'}
          </button>
          <button
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
