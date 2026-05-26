"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNav() {
  const pathname = usePathname();
  // Hide this nav on operational terminal routes
  const terminalRoutes = ['/marketplace', '/orders', '/admin', '/profile'];
  if (terminalRoutes.some(route => pathname?.startsWith(route))) return null;

  return (
    <nav className="flex justify-between items-center px-8 py-5 bg-white border-b border-gray-100 w-full z-50 sticky top-0">
    <div className="text-2xl font-extrabold tracking-tight text-gray-900 cursor-pointer">
      Beibora.
    </div>
    
    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
      <a href="#home" className="hover:text-black transition-colors">Home</a>
      <a href="#about" className="hover:text-black transition-colors">About</a>
      <a href="#terms" className="hover:text-black transition-colors">Terms</a>
    </div>
    
    <div className="flex gap-4 items-center">
      <a href="#login" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
        Log in
      </a>
      <a href="#signup" className="text-sm font-medium text-white bg-black hover:bg-gray-800 px-6 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg">
        Sign up
      </a>
    </div>
  </nav>
  );
}