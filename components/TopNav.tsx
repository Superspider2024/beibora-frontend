"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNav() {
  const pathname = usePathname();
  // Hide this nav on operational terminal routes
  const terminalRoutes = ['/marketplace', '/orders', '/admin', '/profile'];
  if (terminalRoutes.some(route => pathname?.startsWith(route))) return null;

  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 w-full z-50">
      <Link href="/" className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100 hover:text-accent transition-colors">
        Beibora
      </Link>
      <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
        <Link href="/" className="hover:text-accent transition-colors">Home</Link>
        <Link href="/about" className="hover:text-accent transition-colors">About</Link>
        <Link href="/terms" className="hover:text-accent transition-colors">Terms</Link>
      </div>
      <div className="flex gap-4">
        <Link href="/login" className="text-sm font-medium text-white bg-lime-500 hover:bg-lime-600 px-4 py-2 rounded-md shadow-sm">
          Login
        </Link>
      </div>
    </nav>
  );
}