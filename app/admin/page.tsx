"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Eye, CreditCard, X, Package, Heart, LogOut } from "lucide-react";
import api from "../../lib/api";

interface Order {
  _id: string;
  buyer: {
    name: string;
    number: string;
  };
  product: {
    name: string;
    location: string;
  };
  quantity: number;
  totalPrice: number;
  mpesaCode: string;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState<"orders" | "offers">("orders");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [areaFilter, setAreaFilter] = useState<string>("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/all');
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOrder = async (orderId: string, newStatus: string) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      fetchOrders(); // Refresh orders
      setSelectedOrder(null);
    } catch (error) {
      console.error('Failed to update order', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const filteredOrders = orders.filter(order => {
    if (statusFilter !== "all" && order.status !== statusFilter) return false;
    if (areaFilter !== "all" && order.product.location !== areaFilter) return false;
    return true;
  });

  const awaitingVerificationOrders = filteredOrders.filter(order => order.status === 'awaiting_verification');

  const uniqueAreas = [...new Set(orders.map(order => order.product.location))];

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Admin Top Nav */}
      <nav className="bg-[#1A3636] text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Beibora Admin</h1>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2 px-4 py-2 rounded-3xl font-medium transition-colors ${
                activeTab === "orders" ? "bg-[#32CD32]" : "hover:bg-[#32CD32]/20"
              }`}
            >
              <Package size={18} />
              Orders
            </button>
            <button
              onClick={() => setActiveTab("offers")}
              className={`flex items-center gap-2 px-4 py-2 rounded-3xl font-medium transition-colors ${
                activeTab === "offers" ? "bg-[#32CD32]" : "hover:bg-[#32CD32]/20"
              }`}
            >
              <Heart size={18} />
              Offers
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-3xl font-medium hover:bg-red-600 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-200">Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-3xl focus:outline-none focus:border-[#32CD32] text-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="awaiting_verification">Awaiting Verification</option>
                <option value="in_transit">In Transit</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="font-medium text-gray-200">Area:</label>
              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-3xl focus:outline-none focus:border-[#32CD32] text-white"
              >
                <option value="all">All Areas</option>
                {uniqueAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === "orders" ? (
            <div className="bg-gray-800 border border-gray-700 rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-white mb-8">Order Management</h2>

              {awaitingVerificationOrders.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-gray-400 text-lg font-medium">
                    No orders awaiting verification
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {awaitingVerificationOrders.map((order) => (
                    <div key={order._id} className="border border-gray-700 rounded-3xl p-6 hover:bg-gray-700 transition-colors">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="font-bold text-xl text-white mb-2">{order.product.name}</h3>
                          <p className="text-gray-300 mb-1">{order.quantity} units • KES {order.totalPrice.toLocaleString()}</p>
                          <p className="text-gray-300 mb-1">{order.buyer.name} • {order.buyer.number}</p>
                          <p className="text-gray-300">{order.product.location}</p>
                        </div>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="bg-[#1A3636] text-white p-3 rounded-3xl hover:scale-105 transition-transform shadow-sm"
                        >
                          <Eye size={20} />
                        </button>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleVerifyOrder(order._id, 'in_transit')}
                          className="flex items-center gap-2 bg-[#32CD32] text-white px-6 py-3 rounded-3xl font-bold hover:bg-[#28a428] transition-colors shadow-sm"
                        >
                          <CheckCircle size={18} />
                          Verify & Dispatch
                        </button>
                        <button
                          onClick={() => handleVerifyOrder(order._id, 'pending')}
                          className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-3xl font-bold hover:bg-red-600 transition-colors shadow-sm"
                        >
                          <XCircle size={18} />
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-white mb-8">Offers Management</h2>
              <div className="text-center py-20">
                <div className="text-gray-400 text-lg font-medium">
                  Offers functionality coming soon
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Verification Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-gray-800 w-full max-w-md rounded-3xl shadow-sm border border-gray-700">
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Verify Transaction</h2>
                  <p className="text-gray-300">{selectedOrder.product.name}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-700 p-6 rounded-3xl border border-gray-600">
                  <div className="flex items-center mb-3">
                    <CreditCard size={20} className="text-gray-300 mr-3" />
                    <span className="font-bold text-gray-200">M-Pesa Code</span>
                  </div>
                  <div className="text-3xl font-black text-white mb-2">{selectedOrder.mpesaCode}</div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300 font-medium">Buyer:</span>
                    <span className="font-bold text-white">{selectedOrder.buyer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300 font-medium">Phone:</span>
                    <span className="font-bold text-white">{selectedOrder.buyer.number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300 font-medium">Amount:</span>
                    <span className="font-bold text-white">KES {selectedOrder.totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300 font-medium">Product:</span>
                    <span className="font-bold text-white">{selectedOrder.product.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300 font-medium">Quantity:</span>
                    <span className="font-bold text-white">{selectedOrder.quantity}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleVerifyOrder(selectedOrder._id, 'in_transit')}
                    className="flex-1 bg-[#32CD32] text-white py-4 rounded-3xl font-bold hover:bg-[#28a428] transition-colors shadow-sm"
                  >
                    Confirm & Dispatch
                  </button>
                  <button
                    onClick={() => handleVerifyOrder(selectedOrder._id, 'pending')}
                    className="flex-1 bg-red-500 text-white py-4 rounded-3xl font-bold hover:bg-red-600 transition-colors shadow-sm"
                  >
                    Reject Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}