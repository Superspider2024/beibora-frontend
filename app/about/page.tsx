export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <section className="py-24 text-center">
        <h1 className="text-5xl font-black text-[#32CD32] mb-6">About Agricultural Trade</h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">We are a mission-driven marketplace connecting verified smallholder farmers to urban buyers, improving income distribution and reducing waste across the supply chain.</p>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        <div>
          <h2 className="text-2xl font-bold mb-3">The Challenge</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Many farmers receive a fraction of the retail price due to opaque middlemen and inefficient logistics. Our platform addresses those failures with verification, cooperative partnerships, and transparent pricing.</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">Our Approach</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">We combine field verification, cooperative sourcing, and manual escrow reconciliation to guarantee quality and timely payment. Operators in our network handle verification and secure transfer on the ground.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-2">The Field Network</h3>
          <p className="text-gray-600 dark:text-gray-300">Local depots and operators ensure goods are inspected, weighed and handed off with digital receipts — creating trust between farmer and buyer.</p>
        </div>
      </section>
    </main>
  );
}