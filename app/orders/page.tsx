"use client";

import { useState, useEffect } from "react";
import { Clock, CheckCircle } from "lucide-react";
import api from "../../lib/api";

interface Order {
  id: string;
  orderNumber: string;
  item: string;
  qty: number;
  total: number;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      if (Array.isArray(response.data) && response.data.length > 0) {
        const mapped = response.data.map((order: any) => ({
          id: order._id,
          orderNumber: order._id.slice(-6).toUpperCase(),
          item: order.product?.name || order.item || 'Order item',
          qty: order.quantity || order.qty || 1,
          total: order.totalPrice || order.total || 0,
          status: order.status || 'pending',
          createdAt: order.createdAt || new Date().toISOString(),
        }));
        setOrders(mapped);
      } else {
        loadLocalOrders();
      }
    } catch (error) {
      console.error('Failed to fetch orders', error);
      loadLocalOrders();
    } finally {
      setLoading(false);
    }
  };

  const loadLocalOrders = () => {
    const local = JSON.parse(localStorage.getItem('beiboraOrders') || '[]');
    if (Array.isArray(local)) {
      setOrders(local);
    } else {
      setOrders([]);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock size={24} className="text-orange-500" />;
      case "delivered":
        return <CheckCircle size={24} className="text-[#32CD32]" />;
      default:
        return <Clock size={24} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "delivered":
        return "bg-[#32CD32]/10 text-[#32CD32]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-6 pb-24">
      <header className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Orders</h1>
        <p className="text-gray-600 text-lg">Track your purchases</p>
      </header>

      {/* Orders List */}
      <div className="max-w-4xl mx-auto space-y-6">
        {orders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <p className="text-gray-500 text-lg">No orders yet. Place your first order from the marketplace.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-[#16a34a]">Order #{order.orderNumber}</p>
                  <h2 className="text-2xl font-bold mt-2">{order.item}</h2>
                  <p className="text-gray-600 mt-1">{order.qty} units • KES {order.total.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status.replaceAll("_", " ")}
                  </span>
                  <p className="text-gray-500 text-sm mt-2">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}