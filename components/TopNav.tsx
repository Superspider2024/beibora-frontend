"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();

  // Show top nav on homepage, terms, and about pages
  if (!["/", "/terms", "/about"].includes(pathname)) {
    return null;
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#32CD32] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-bold text-[#32CD32]">Beibora</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className={`font-medium transition-colors ${
              pathname === "/" ? "text-[#32CD32]" : "text-gray-300 hover:text-[#32CD32]"
            }`}>
              Home
            </Link>
            <Link href="/terms" className={`font-medium transition-colors ${
              pathname === "/terms" ? "text-[#32CD32]" : "text-gray-300 hover:text-[#32CD32]"
            }`}>
              Terms
            </Link>
            <Link href="/about" className={`font-medium transition-colors ${
              pathname === "/about" ? "text-[#32CD32]" : "text-gray-300 hover:text-[#32CD32]"
            }`}>
              About
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/signup"
            className="text-gray-300 font-medium hover:text-[#32CD32] transition-colors"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="bg-[#32CD32] text-white px-6 py-2 rounded-3xl font-medium hover:bg-[#28a428] transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}