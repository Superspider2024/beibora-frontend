"use client";

import { useState, useEffect } from "react";
import { Clock, CreditCard } from "lucide-react";
import api from "../../lib/api";

interface Order {
  _id: string;
  product: {
    name: string;
    unit: string;
  };
  quantity: number;
  totalPrice: number;
  mpesaCode: string;
  status: "pending" | "awaiting_verification" | "in_transit" | "delivered";
  createdAt: string;
}

export default function OffersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock size={24} className="text-orange-500" />;
      case "awaiting_verification": return <CreditCard size={24} className="text-yellow-500" />;
      default: return <Clock size={24} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-orange-100 text-orange-800";
      case "awaiting_verification": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const pendingOrders = orders.filter(order => order.status === "pending");

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-white p-6 pb-24">
      <header className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-black text-black mb-2">Offers</h1>
        <p className="text-gray-600 text-lg">Your pending bids and offers</p>
      </header>

      {/* Orders List */}
      <div className="max-w-4xl mx-auto space-y-6">
        {pendingOrders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-lg font-medium">
              No pending offers
            </div>
          </div>
        ) : (
          pendingOrders.map((order) => (
            <div key={order._id} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  {getStatusIcon(order.status)}
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-black">{order.product.name}</h3>
                    <p className="text-gray-600">
                      {order.quantity} {order.product.unit} • KES {order.totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-2xl text-sm font-bold ${getStatusColor(order.status)}`}>
                  {order.status.replace("_", " ")}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <CreditCard size={18} className="mr-2" />
                  <span className="font-medium">{order.mpesaCode}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}