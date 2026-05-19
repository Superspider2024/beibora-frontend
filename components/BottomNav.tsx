"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  const terminalRoutes = ['/marketplace', '/orders', '/admin', '/profile'];
  if (!terminalRoutes.some(route => pathname?.startsWith(route))) return null;

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 shadow-lg z-50">
      <div className="flex gap-6">
      {[
        { href: '/marketplace', label: 'Market' },
        { href: '/orders', label: 'Orders' },
        { href: '/admin', label: 'Admin' },
        { href: '/profile', label: 'Profile' }
      ].map((link) => (
        <Link key={link.href} href={link.href} className={`text-sm font-medium ${pathname === link.href ? 'text-accent' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
          {link.label}
        </Link>
      ))}
      </div>
    </nav>
  );
}