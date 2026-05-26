"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  const terminalRoutes = ['/marketplace', '/orders', '/admin', '/profile'];
  if (!terminalRoutes.some(route => pathname?.startsWith(route))) return null;

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 dark:bg-gray-950/95 border border-gray-200 dark:border-gray-800 rounded-full px-4 py-3 shadow-xl backdrop-blur-md z-50">
      <div className="flex gap-6">
        {[
          { href: '/marketplace', label: 'Market' },
          { href: '/orders', label: 'Orders' },
          { href: '/admin', label: 'Admin' },
          { href: '/profile', label: 'Profile' }
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-colors ${pathname === link.href ? 'text-lime-600 dark:text-lime-400' : 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white'}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}