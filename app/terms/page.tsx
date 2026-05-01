import TopNav from "../../components/TopNav";

export default function TermsPage() {
  return (
    <>
      <TopNav />
      <main className="min-h-screen bg-gray-900 p-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-black mb-6 text-red-400">Terms of Reality</h1>
          <div className="space-y-6 text-gray-300">
            <p><strong className="text-white">1. Liability:</strong> If goods are lost under your watch, you pay. No excuses.</p>
            <p><strong className="text-white">2. Integrity:</strong> Falsifying weights results in immediate ban from the protocol.</p>
            <p><strong className="text-white">3. Payment:</strong> KES 2,000 retainer for the pilot phase.</p>
          </div>
        </div>
      </main>
    </>
  );
}