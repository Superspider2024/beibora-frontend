"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function TopNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [pathname]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md transition-colors shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left: Logo & Core Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#32CD32] rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">AT</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-[#32CD32]">Agricultural Trade</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/" className={`hover:text-[#32CD32] transition-colors ${pathname === '/' ? 'text-[#32CD32]' : ''}`}>Home</Link>
            <Link href="/about" className={`hover:text-[#32CD32] transition-colors ${pathname === '/about' ? 'text-[#32CD32]' : ''}`}>About</Link>
            <Link href="/terms" className={`hover:text-[#32CD32] transition-colors ${pathname === '/terms' ? 'text-[#32CD32]' : ''}`}>Terms</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                <Link href="/marketplace" className={`hover:text-[#32CD32] transition-colors ${pathname === '/marketplace' ? 'text-[#32CD32]' : ''}`}>Marketplace</Link>
                <Link href="/orders" className={`hover:text-[#32CD32] transition-colors ${pathname === '/orders' ? 'text-[#32CD32]' : ''}`}>Orders</Link>
              </div>
              <Link href="/profile" className="hidden md:inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-[#32CD32] hover:text-[#32CD32] transition-colors">
                Profile
              </Link>
              <button onClick={handleLogout} className="rounded-full bg-[#32CD32] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                <Link href="/" className={`hover:text-[#32CD32] transition-colors ${pathname === '/' ? 'text-[#32CD32]' : ''}`}>Home</Link>
                <Link href="/about" className={`hover:text-[#32CD32] transition-colors ${pathname === '/about' ? 'text-[#32CD32]' : ''}`}>About</Link>
                <Link href="/terms" className={`hover:text-[#32CD32] transition-colors ${pathname === '/terms' ? 'text-[#32CD32]' : ''}`}>Terms</Link>
              </div>
              <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-[#32CD32] transition-colors">
                Log in
              </Link>
              <Link href="/signup" className="rounded-full bg-[#32CD32] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}