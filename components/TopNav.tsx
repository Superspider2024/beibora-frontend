"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function TopNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Check auth and theme on load
  useEffect(() => {
    const token = localStorage.getItem("token"); // Replace with your actual auth check
    setIsLoggedIn(!!token);

    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else if (saved === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, [pathname]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left: Logo & Core Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#32CD32] rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">AT</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-[#32CD32]">Agricultural Trade</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
            <Link href="/" className={`hover:text-black dark:hover:text-white transition-colors ${pathname === '/' ? 'text-black dark:text-white' : ''}`}>Home</Link>
            <Link href="/about" className={`hover:text-black dark:hover:text-white transition-colors ${pathname === '/about' ? 'text-black dark:text-white' : ''}`}>About</Link>
            <Link href="/terms" className={`hover:text-black dark:hover:text-white transition-colors ${pathname === '/terms' ? 'text-black dark:text-white' : ''}`}>Terms</Link>
          </div>
        </div>

        {/* Right: Theme Toggle & Auth/Profile */}
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300">
            {isDark ? '☀️' : '🌙'}
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/profile">
                {/* Profile Avatar Placeholder */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gray-800 to-black dark:from-gray-200 dark:to-white flex items-center justify-center text-white dark:text-black font-bold shadow-sm hover:scale-105 transition-transform">
                  D
                </div>
              </Link>
              <button onClick={handleLogout} className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-sm font-bold">
              <Link href="/login" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">Log in</Link>
              <Link href="/signup" className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}