"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  const terminalRoutes = ['/marketplace', '/orders', '/admin', '/profile'];
  if (!terminalRoutes.some(route => pathname?.startsWith(route))) return null;

  return (
    <nav className="fixed bottom-0 w-full bg-[#171717] border-t border-gray-800 text-white flex justify-around p-4 z-50">
      {[
        { href: '/marketplace', label: 'Market' },
        { href: '/orders', label: 'Orders' },
        { href: '/admin', label: 'Admin' },
        { href: '/profile', label: 'Profile' }
      ].map((link) => (
        <Link key={link.href} href={link.href} className={`text-[10px] font-black uppercase tracking-widest ${pathname === link.href ? 'text-lime-400' : 'text-gray-500 hover:text-white'}`}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}