"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNav() {
  const pathname = usePathname();
  // Hide this nav on operational terminal routes
  const terminalRoutes = ['/marketplace', '/orders', '/admin', '/profile'];
  if (terminalRoutes.some(route => pathname?.startsWith(route))) return null;

  return (
    <nav className="flex justify-between items-center p-6 bg-[#202124] border-b border-gray-800 w-full z-50">
      <Link href="/" className="text-xl font-black tracking-tighter uppercase text-white hover:text-lime-400 transition-colors">
        Beibora
      </Link>
      <div className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-widest text-gray-400">
        <Link href="/" className="hover:text-lime-400 transition-colors">Home</Link>
        <Link href="/about" className="hover:text-lime-400 transition-colors">About</Link>
        <Link href="/terms" className="hover:text-lime-400 transition-colors">Terms</Link>
      </div>
      <div className="flex gap-4">
        <Link href="/login" className="text-xs font-bold uppercase tracking-widest text-white hover:text-lime-400 px-6 py-2 border border-gray-700 hover:border-lime-400 transition-colors">
          Login
        </Link>
      </div>
    </nav>
  );
}