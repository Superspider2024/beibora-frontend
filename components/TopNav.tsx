"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNav() {
  const pathname = usePathname();
  // Hide this nav on operational terminal routes
  const terminalRoutes = ['/marketplace', '/orders', '/admin', '/profile'];
  if (terminalRoutes.some(route => pathname?.startsWith(route))) return null;

  return (
    <nav className="flex justify-between items-center p-6 bg-white border-b border-gray-300">
      <div className="text-xl font-black tracking-tighter uppercase text-black">Beibora</div>
      <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-gray-500">
        <Link href="/" className="hover:text-black transition">Home</Link>
        <Link href="/about" className="hover:text-black transition">About</Link>
        <Link href="/terms" className="hover:text-black transition">Terms</Link>
      </div>
      <div className="flex gap-4">
        <Link href="/login" className="text-xs font-bold uppercase tracking-widest text-black hover:text-gray-600 px-4 py-2 border border-black">Login</Link>
      </div>
    </nav>
  );
}