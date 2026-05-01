'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Heart, Package, User } from 'lucide-react';

const userNavItems = [
  { href: '/marketplace', icon: ShoppingCart, label: 'Market' },
  { href: '/offers', icon: Heart, label: 'Offers' },
  { href: '/orders', icon: Package, label: 'Orders' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const pathname = usePathname();

  // Only show bottom nav for logged-in users (not on homepage, signup, login, admin)
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('token');
  const isUserPage = ['/marketplace', '/offers', '/orders', '/profile'].includes(pathname);

  if (!isLoggedIn || !isUserPage) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 px-6 py-4">
      <div className="flex justify-around">
        {userNavItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center p-3 rounded-2xl transition-all ${
              pathname === href
                ? 'text-[#32CD32] bg-[#1A3636]/20'
                : 'text-gray-400 hover:text-[#32CD32]'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs mt-2 font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}