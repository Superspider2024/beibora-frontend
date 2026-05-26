"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNav() {
  const pathname = usePathname();
  const terminalRoutes = ['/marketplace', '/orders', '/admin', '/profile'];
  if (terminalRoutes.some(route => pathname?.startsWith(route))) return null;

  return (
    <nav className="flex flex-wrap justify-between items-center gap-4 px-6 py-4 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 w-full z-50 sticky top-0 backdrop-blur-xl">
      <div className="text-2xl font-extrabold tracking-tight text-black dark:text-white">
        Beibora.
      </div>

      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
        <Link href="/about" className="hover:text-black dark:hover:text-white transition-colors">About</Link>
        <Link href="/terms" className="hover:text-black dark:hover:text-white transition-colors">Terms</Link>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <Link href="/login" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
          Log in
        </Link>
        <Link href="/signup" className="text-sm font-semibold text-white bg-black dark:bg-lime-500 hover:bg-gray-800 dark:hover:bg-lime-400 px-6 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg">
          Sign up
        </Link>
      </div>
    </nav>
  );
}