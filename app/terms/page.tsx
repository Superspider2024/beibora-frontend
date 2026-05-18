export default function Terms() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <section className="py-24 text-center">
        <h1 className="text-4xl font-black mb-4">Terms of Service</h1>
        <p className="text-sm text-gray-500">Last Updated: May 2026</p>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8 prose prose-gray dark:prose-invert">
        <h3>1. Operating Protocol</h3>
        <p>All users agree to follow verification standards. We require physical verification at handover before funds are reconciled.</p>

        <h3>2. Financial Escrow</h3>
        <p>Payments are tracked and only finalized after confirmation of delivery and inspection. Fraudulent activity may lead to account suspension.</p>

        <h3>3. Network Access</h3>
        <p>We may limit access or adjust service levels to maintain platform stability and fair operation across the network.</p>
      </section>
    </main>
  );
}