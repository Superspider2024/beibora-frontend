"use client";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-12 text-gray-700 dark:text-gray-200 font-sans selection:bg-accent selection:text-black">
      <div className="max-w-4xl mx-auto card p-10">
        
        <header className="mb-10 border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-semibold tracking-tight mb-2 text-gray-900 dark:text-gray-100">
            Operating Agreement & Terms of Service
          </h1>
          <p className="text-xs font-mono text-lime-400 uppercase tracking-widest">
            Last Updated: May 2026 | Beibora Agricultural Exchange
          </p>
        </header>

        <div className="space-y-8 text-sm leading-relaxed font-mono">
          
          <section>
            <h3 className="text-white font-bold uppercase mb-2">1. Scope of Agreement</h3>
            <p>
              By accessing the Beibora digital exchange, you (whether acting as a Sargonne participant, a Mansart coordinator, or a registered buyer) enter into a binding legal agreement with Beibora. Our platform provides agricultural commodity routing, connecting rural cooperatives directly to urban market demand. You acknowledge that Beibora acts solely as an intermediary and marketplace facilitator, not as the physical owner of the produce traded.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold uppercase mb-2">2. Compensation & Transaction Fee Structure</h3>
            <p>
              Beibora operates on a transparent "Compound Fee" model. A platform transaction fee of 8% is applied to the aggregated landed cost, which includes the farm-gate price, third-party logistics (3PL) transport fees, and any applicable commissions. This fee is non-negotiable and is automatically withheld upon the successful validation of delivery. Bypassing the Beibora terminal to conduct direct trades with linked cooperatives is a breach of service and will result in the immediate and permanent termination of your operator status.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold uppercase mb-2">3. Logistics & Spoilage Liability</h3>
            <p>
              The movement of physical produce is handled by independent third-party logistics providers. Beibora mandates that all goods are inspected at the point of origin by a Mansart agent. However, transit delays, environmental factors, and mechanical failures inherent to informal Nairobi logistics are risks inherent to the trade. Liability for physical spoilage or transit damage transfers from the cooperative to the purchaser upon the Sargonne's confirmation of drop-off at the centralized hub. Claims for transit-related losses must be substantiated by geotagged photographic evidence uploaded within 30 minutes of receipt.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold uppercase mb-2">4. Payment Escrow Protocol</h3>
            <p>
              All payments are facilitated through our escrow system. When a buyer initiates an order, funds are verified. Upon the physical delivery and validation of the commodity by the regional Sargonne, the payment is released to the cooperative's designated accounts. Buyers who attempt to withhold payment post-validation will be blacklisted across all participants. Similarly, cooperatives that fail to deliver quantities or qualities as described will face immediate suspension.
            </p>
          </section>

          <section>
            <h3 className="text-white font-bold uppercase mb-2">5. Dispute Resolution</h3>
            <p>
              In the event of a dispute between a buyer and a cooperative regarding quality or weight, the local Sargonne acts as the primary arbitrator. Their assessment, supported by the digital logs and photographs submitted to the platform, is final. Beibora reserves the right to withhold payouts from the escrow account during the duration of any dispute investigation. By continuing to use the service, you agree to submit to this operational arbitration process and waive the right to seek damages beyond the transaction value.
            </p>
          </section>

          <footer className="pt-10 mt-10 border-t border-gray-100 dark:border-gray-800 text-gray-500 text-sm">
            <p>&copy; 2026 Beibora Agricultural Exchange. All rights reserved.</p>
            <p>Registered Operations: Nairobi, Kenya. Dispatch: 0722721923</p>
          </footer>

        </div>
      </div>
    </div>
  );
}