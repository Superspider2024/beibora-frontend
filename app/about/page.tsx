"use client";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-12 text-gray-700 dark:text-gray-200 font-sans selection:bg-accent selection:text-black">
      <div className="max-w-4xl mx-auto card p-10">
        
        <header className="mb-10 border-b border-gray-800 pb-6">
          <h1 className="text-4xl font-semibold tracking-tight mb-4 text-gray-900 dark:text-gray-100">
            Overview
          </h1>
          <p className="text-sm text-accent uppercase tracking-widest">
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
            <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-4 text-sm">Operations</h3>
            <p className="mb-4">
              The Beibora ecosystem is structured around two specialized operator roles. The
              <span className="text-accent font-semibold"> Mansart</span> role manages supply-side integration—working with local cooperatives to ensure produce quality before transport.
            </p>
            <p>
              The <span className="text-accent font-semibold"> Sargonne</span> role focuses on demand aggregation in urban trade hubs, bundling micro-purchases into efficient shipments to reduce last-mile costs.
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

          <footer className="pt-10 mt-10 border-t border-gray-100 dark:border-gray-800 text-gray-600 text-sm">
            <p className="uppercase tracking-widest mb-2 text-accent">HQ Office: Nairobi, Kenya</p>
            <p>Dispatch Line: 0722721923</p>
            <p>Inquiry: beibora@gmail.com</p>
          </footer>

        </div>
      </div>
    </div>
  );
}