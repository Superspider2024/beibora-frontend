"use client";

export default function About() {
  return (
    <div className="min-h-screen bg-[#202124] p-6 md:p-12 text-gray-300 font-sans selection:bg-lime-400 selection:text-black">
      <div className="max-w-4xl mx-auto bg-[#171717] border border-gray-800 shadow-2xl p-10">
        
        <header className="mb-10 border-b border-gray-800 pb-6">
          <h1 className="text-4xl font-black tracking-tighter uppercase text-white mb-4">
            Protocol Overview
          </h1>
          <p className="text-sm font-mono text-lime-400 uppercase tracking-widest">
            Beibora Agricultural Exchange: Institutional Logistics
          </p>
        </header>

        <div className="space-y-10 text-base leading-relaxed text-gray-400">
          
          <section>
            <h3 className="text-white font-bold uppercase mb-4 text-sm tracking-widest">Mission: Disintermediation</h3>
            <p className="mb-4">
              Beibora was founded to solve the structural inefficiency of the Kenyan agricultural supply chain. 
              For decades, informal brokerage has inflated costs for urban retailers while depressing farm-gate 
              margins. We utilize decentralized, technology-driven logistics to eliminate these parasitic 
              middlemen. Our mission is to restore profitability to the smallholder farmer by providing 
              a direct, high-speed conduit to Nairobi’s primary markets.
            </p>
            <p>
              We view ourselves not merely as a marketplace, but as a critical infrastructure layer. By 
              optimizing load-balancing and transport efficiency, we ensure that fresh produce moves 
              from the soil to the stall with minimal shrinkage and maximum economic retention for 
              the cooperative.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold uppercase mb-4 text-sm tracking-widest">Node Architecture</h3>
            <p className="mb-4">
              The Beibora ecosystem is powered by two distinct, specialized operational nodes. The 
              <span className="text-lime-400 font-bold"> Mansart Node</span> manages the supply-side integration. 
              These operators are embedded within local cooperatives, ensuring that the produce entering 
              our system meets rigorous quality standards before it ever hits a lorry.
            </p>
            <p>
              The <span className="text-lime-400 font-bold"> Sargonne Node</span> manages demand aggregation. 
              Operating in urban trade hubs, these nodes bundle thousands of fragmented micro-purchases 
              from informal vendors into optimized 10,000 Ksh physical units. This centralizes logistics, 
              dramatically reducing the last-mile complexity and costs that plague traditional brokers.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold uppercase mb-4 text-sm tracking-widest">Operational Philosophy</h3>
            <p className="mb-4">
              We operate on a transparent, flat-fee commission model. Our 8% transaction fee, applied 
              across the total bundled cost, ensures that the platform remains sustainable while 
              guaranteeing a competitive price for buyers and superior earnings for farmers. We 
              do not manipulate prices; we provide the data, the network, and the terminal to make 
              fair trade the most efficient trade.
            </p>
            <p>
              Complexity belongs in the background; in the foreground, we provide simplicity. 
              Beibora is built to be the silent engine of the Nairobi informal food trade—reliable, 
              fast, and uncompromisingly efficient.
            </p>
          </section>

          <footer className="pt-10 mt-10 border-t border-gray-800 text-gray-600 text-xs font-mono">
            <p className="uppercase tracking-widest mb-2 text-lime-400">HQ Terminal: Nairobi, Kenya</p>
            <p>Dispatch Line: 0722721923</p>
            <p>Inquiry: beibora@gmail.com</p>
          </footer>

        </div>
      </div>
    </div>
  );
}