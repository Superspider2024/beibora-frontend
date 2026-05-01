import TopNav from "../../components/TopNav";

export default function AboutPage() {
  return (
    <>
      <TopNav />
      <div className="min-h-screen bg-gray-900 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-black text-white mb-8 uppercase tracking-tight">The Beibora Mission</h1>
          <div className="prose prose-lg text-gray-300 space-y-6">
            <p className="font-bold text-[#32CD32] text-xl">
              Beibora is not just an app; it is an infrastructure for trust.
            </p>
            <p>
              We created the <strong className="text-white">Mavuno Protocol</strong> to solve the core problem of African agriculture: Information Asymmetry.
              By combining local physical verification with digital escrow, we ensure that farmers get paid exactly what they deserve and buyers receive exactly what they paid for.
            </p>
            <h3 className="text-2xl font-bold text-white pt-6">The Triple-Check System</h3>
            <ul className="list-disc pl-5 space-y-4 text-gray-300">
              <li><strong className="text-white">The Mansart:</strong> Local agents who verify farmers and their initial inventory.</li>
              <li><strong className="text-white">The Porter:</strong> Custodians who weigh and secure goods at the depot.</li>
              <li><strong className="text-white">The Sargonne:</strong> High-volume market movers who provide the liquidity that keeps the engine running.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}