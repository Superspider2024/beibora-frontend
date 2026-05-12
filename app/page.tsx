import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
        The Protocol for <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-500">
          Direct Agricultural Trade.
        </span>
      </h1>
      
      <p className="max-w-2xl text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10">
        Beibora connects small-scale farmers directly to urban retailers. 
        Bypass the middlemen. Verified weights, secure manual escrow, and better margins for everyone.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Link href="/marketplace" className="bg-black text-white dark:bg-white dark:text-black px-8 py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform w-full sm:w-auto">
          Open Marketplace
        </Link>
        <Link href="/about" className="border border-gray-200 dark:border-gray-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors w-full sm:w-auto">
          How it Works
        </Link>
      </div>
    </div>
  );
}