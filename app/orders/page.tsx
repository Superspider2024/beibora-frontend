"use client";

import { useState, useEffect } from "react";
import { Clock, Truck, CheckCircle, CreditCard } from "lucide-react";
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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"orders" | "offers">("orders");

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
      case "in_transit": return <Truck size={24} className="text-blue-500" />;
      case "delivered": return <CheckCircle size={24} className="text-[#32CD32]" />;
      default: return <Clock size={24} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-orange-100 text-orange-800";
      case "awaiting_verification": return "bg-yellow-100 text-yellow-800";
      case "in_transit": return "bg-blue-100 text-blue-800";
      case "delivered": return "bg-[#32CD32]/10 text-[#32CD32]";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === "orders") {
      return ["pending", "awaiting_verification", "in_transit", "delivered"].includes(order.status);
    } else {
      // For offers, show pending orders (bids/offers)
      return order.status === "pending";
    }
  });

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-900 p-6 pb-24">
      <header className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-black text-white mb-2">Orders</h1>
        <p className="text-gray-300 text-lg">Track your purchases</p>
      </header>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto mb-8 flex">
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex-1 py-4 px-6 rounded-3xl font-bold text-center transition-all ${
            activeTab === "orders"
              ? "bg-[#1A3636] text-white shadow-sm"
              : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("offers")}
          className={`flex-1 py-4 px-6 rounded-3xl font-bold text-center transition-all ml-4 ${
            activeTab === "offers"
              ? "bg-[#1A3636] text-white shadow-sm"
              : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
          }`}
        >
          Offers
        </button>
      </div>

      {/* Orders List */}
      <div className="max-w-4xl mx-auto space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-lg font-medium">
              {activeTab === "orders" ? "No orders found" : "No offers found"}
            </div>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order._id} className="bg-gray-800 border border-gray-700 rounded-3xl p-8 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  {getStatusIcon(order.status)}
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-white">{order.product.name}</h3>
                    <p className="text-gray-300">
                      {order.quantity} {order.product.unit} • KES {order.totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-3xl text-sm font-bold ${getStatusColor(order.status)}`}>
                  {order.status.replace("_", " ")}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-400">
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