"use client";
import { useState } from "react";

export default function AdminTerminal() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="bg-white min-h-screen p-8 text-black font-mono">
      <div className="flex gap-8 mb-8 border-b pb-4">
        <button onClick={() => setActiveTab('orders')} className={`text-sm uppercase font-bold ${activeTab === 'orders' ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}>Upcoming Orders</button>
        <button onClick={() => setActiveTab('accounts')} className={`text-sm uppercase font-bold ${activeTab === 'accounts' ? 'text-black border-b-2 border-black' : 'text-gray-400'}`}>Node Accounts</button>
      </div>

      {activeTab === 'orders' ? (
        <section>
          <div className="grid grid-cols-4 gap-4 text-xs uppercase text-gray-500 mb-4">
            <div>Order ID</div><div>Commodity</div><div>Volume</div><div>Status</div>
          </div>
          {/* Order Rows Here */}
        </section>
      ) : (
        <section>
          <div className="grid grid-cols-4 gap-4 text-xs uppercase text-gray-500 mb-4">
            <div>Node ID</div><div>Managed By</div><div>Weekly GMV</div><div>Status</div>
          </div>
          {/* Account Rows Here */}
        </section>
      )}
    </div>
  );
}