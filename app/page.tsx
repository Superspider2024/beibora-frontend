import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6 font-sans">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black uppercase">
          Beibora Exchange
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-medium">
          The decentralized agricultural commodity terminal. Direct routing. Transparent margins.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
          <Link href="/login" className="bg-black text-white px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-gray-800 transition">
            Access Terminal
          </Link>
          <Link href="/about" className="border border-black text-black px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-gray-100 transition">
            System Specs
          </Link>
        </div>
      </div>
    </div>
  );
}