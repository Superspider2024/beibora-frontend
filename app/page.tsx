import Link from "next/link";

// Dummy data for the preview market
const DUMMY_GOODS = [
  { id: 1, name: "Murang'a Tomatoes", price: "Ksh 3,500 / Crate", weight: "50 KG", type: "Produce" },
  { id: 2, name: "Kinangop Cabbages", price: "Ksh 2,200 / Net", weight: "90 KG", type: "Produce" },
  { id: 3, name: "Narok Onions", price: "Ksh 4,800 / Net", weight: "120 KG", type: "Produce" },
  { id: 4, name: "Nyandarua Potatoes", price: "Ksh 3,000 / Sack", weight: "50 KG", type: "Produce" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#202124] text-white font-sans flex flex-col selection:bg-lime-400 selection:text-black">
      
      {/* Hero Section */}
      <main className="flex-grow flex flex-col justify-center items-center p-6 pt-24 pb-20">
        <div className="max-w-4xl text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white">
            Beibora <span className="text-lime-400">Exchange</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-400 font-medium max-w-3xl mx-auto">
            Direct from the soil to your stall. Connecting Kenya's farmers directly to you with zero hidden broker fees.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 items-center">
            <Link 
              href="/signup" 
              className="bg-lime-400 text-black px-10 py-4 text-sm uppercase tracking-widest font-black hover:bg-lime-500 transition-all w-full sm:w-auto text-center shadow-[0_0_20px_rgba(163,230,53,0.2)] hover:shadow-[0_0_30px_rgba(163,230,53,0.4)]"
            >
              Enter Marketplace
            </Link>
            <Link 
              href="/signup" 
              className="border border-lime-400 text-lime-400 px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-lime-400 hover:text-black transition-colors w-full sm:w-auto text-center"
            >
              Sign Up
            </Link>
            <Link 
              href="/about" 
              className="text-gray-400 px-10 py-4 text-sm uppercase tracking-widest font-bold hover:text-white transition-colors w-full sm:w-auto text-center"
            >
              About
            </Link>
          </div>
        </div>
      </main>

      {/* Dummy Market Display */}
      <section className="bg-[#171717] py-20 border-t border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10 border-b border-gray-800 pb-4">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-white">Live Market Feeds</h2>
              <p className="text-xs text-lime-400 uppercase tracking-widest mt-1">Preview Mode • Read Only</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DUMMY_GOODS.map((good) => (
              <div key={good.id} className="bg-[#202124] border border-gray-800 p-6 hover:border-lime-400 transition-colors cursor-default group">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{good.type}</span>
                  <span className="bg-lime-400/10 text-lime-400 text-[10px] px-2 py-1 uppercase font-bold tracking-wider group-hover:bg-lime-400 group-hover:text-black transition-colors">
                    Direct
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-100">{good.name}</h3>
                <p className="text-2xl font-mono text-white mb-6">{good.price}</p>
                <div className="flex justify-between items-center text-xs text-gray-500 font-mono border-t border-gray-800 pt-4">
                  <span>Vol: <span className="text-gray-300">{good.weight}</span></span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></div>
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] py-16 text-center md:text-left">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-3">Beibora</h3>
            <p className="text-sm text-gray-500 font-mono max-w-xs mx-auto md:mx-0">
              The decentralized B2B agricultural logistics terminal.
            </p>
          </div>
          
          <div className="font-mono text-sm text-gray-400 space-y-3">
            <p className="uppercase text-xs font-bold tracking-widest text-gray-600 mb-5">Contact Protocol</p>
            <p>Email: <a href="mailto:beibora@gmail.com" className="text-lime-400 hover:underline">beibora@gmail.com</a></p>
            <p>Dispatch: <span className="text-lime-400">0722721923</span></p>
          </div>
          
          <div className="font-mono text-sm text-gray-400 md:text-right space-y-3">
             <p className="uppercase text-xs font-bold tracking-widest text-gray-600 mb-5">Operations Base</p>
             <p className="text-white">Nairobi, Kenya</p>
             <p>HQ Terminal</p>
          </div>
        </div>
      </footer>
      
    </div>
  );
}