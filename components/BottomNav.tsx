"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  // Only show this nav on operational terminal routes
  const terminalRoutes = ['/marketplace', '/orders', '/admin', '/profile'];
  if (!terminalRoutes.some(route => pathname?.startsWith(route))) return null;

  return (
    <nav className="fixed bottom-0 w-full bg-black border-t border-gray-800 text-white flex justify-around p-4 text-xs font-bold uppercase tracking-widest z-50">
      <Link href="/marketplace" className={`hover:text-gray-400 ${pathname === '/marketplace' ? 'text-green-500' : ''}`}>Market</Link>
      <Link href="/orders" className={`hover:text-gray-400 ${pathname === '/orders' ? 'text-green-500' : ''}`}>Orders</Link>
      <Link href="/admin" className={`hover:text-gray-400 ${pathname === '/admin' ? 'text-green-500' : ''}`}>Admin</Link>
      <Link href="/profile" className={`hover:text-gray-400 ${pathname === '/profile' ? 'text-green-500' : ''}`}>Profile</Link>
    </nav>
  );
}