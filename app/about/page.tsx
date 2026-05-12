export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 w-full">
      <h1 className="text-4xl font-black tracking-tight mb-8">About Beibora</h1>
      
      <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-3">The Problem</h2>
          <p>Traditional supply chains in Kenya are dominated by brokers who suppress farmer earnings while inflating retail prices in the city. The gap between the farm and the restaurant is broken.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-3">The Protocol</h2>
          <p>Beibora acts as a decentralized exchange. We source directly from Saccos and deliver directly to high-volume urban buyers. Using our proprietary verification system, goods are weighed and paid for instantly upon delivery.</p>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 mt-8">
          <h2 className="text-xl font-bold text-black dark:text-white mb-2">The Sargonne Network</h2>
          <p className="text-sm">
            Beibora is powered by on-the-ground operators known as <strong>Sargonnes</strong>. They are the commanders of the city logistics, ensuring seamless handover and digital verification for every single transaction.
          </p>
        </section>
      </div>
    </div>
  );
}