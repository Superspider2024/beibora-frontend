"use client";

import { useState, useEffect } from "react";
import { MapPin, CreditCard, X } from "lucide-react";
import api from "../../lib/api";

interface Product {
  _id: string;
  name: string;
  pricePerUnit: number;
  stock: number;
  unit: string;
  location: string;
  farmer: {
    name: string;
  };
}

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number | "">("");
  const [mpesaCode, setMpesaCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (price: number, qty: number) => {
    const subtotal = price * qty;
    const fee = subtotal * 0.05; // 5% commission
    return subtotal + fee;
  };

  const handleBuy = async () => {
    if (!selectedProduct || !quantity || !mpesaCode) return;

    setIsSubmitting(true);
    try {
      await api.post('/orders', {
        productId: selectedProduct._id,
        quantity: Number(quantity),
        mpesaCode,
      });
      alert('Order placed successfully! Awaiting verification.');
      setSelectedProduct(null);
      setQuantity("");
      setMpesaCode("");
      fetchProducts(); // Refresh products
    } catch (error: any) {
      alert(error.response?.data?.msg || 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-900 p-6 pb-24">
      <header className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl font-black text-white mb-2">Marketplace</h1>
        <p className="text-gray-300 text-lg">Verified agricultural commodities</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-gray-800 border border-gray-700 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">{product.name}</h2>
              <div className="flex items-center text-gray-300 mb-4">
                <MapPin size={20} className="mr-2" />
                <span className="font-medium">{product.location}</span>
              </div>
              <div className="text-3xl font-black text-[#32CD32]">
                KES {product.pricePerUnit.toLocaleString()}
                <span className="text-sm font-medium text-gray-400 ml-1">/{product.unit}</span>
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {product.stock} {product.unit} available
              </div>
            </div>

            <button
              onClick={() => setSelectedProduct(product)}
              disabled={product.stock === 0}
              className="w-full bg-[#1A3636] text-white py-4 rounded-3xl font-bold hover:bg-[#2a4a4a] transition-transform shadow-sm disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {product.stock === 0 ? 'Sold Out' : 'Buy'}
            </button>
          </div>
        ))}
      </div>

      {/* Buy Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-gray-800 w-full max-w-md rounded-3xl shadow-sm border border-gray-700">
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedProduct.name}</h2>
                  <p className="text-gray-300">{selectedProduct.location}</p>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-200 mb-3">
                    Quantity ({selectedProduct.unit})
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={selectedProduct.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full p-4 bg-gray-700 border border-gray-600 rounded-3xl focus:outline-none focus:border-[#32CD32] transition-colors font-medium text-white placeholder-gray-500"
                    placeholder={`Max: ${selectedProduct.stock}`}
                  />
                </div>

                {quantity && (
                  <div className="bg-gray-700 p-6 rounded-3xl border border-gray-600">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-300 font-medium">Subtotal</span>
                      <span className="font-bold text-white">KES {(selectedProduct.pricePerUnit * Number(quantity)).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-300 font-medium">Platform Fee (5%)</span>
                      <span className="font-bold text-white">KES {(selectedProduct.pricePerUnit * Number(quantity) * 0.05).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-600">
                      <span className="text-white font-bold text-lg">Total</span>
                      <span className="text-[#32CD32] font-black text-xl">
                        KES {calculateTotal(selectedProduct.pricePerUnit, Number(quantity)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                <div className="bg-[#32CD32]/10 p-6 rounded-3xl border border-[#32CD32]/20">
                  <div className="flex items-center mb-3">
                    <CreditCard size={20} className="text-[#32CD32] mr-3" />
                    <span className="font-bold text-[#32CD32]">Pay to Till Number</span>
                  </div>
                  <div className="text-3xl font-black text-[#32CD32] mb-2">123456</div>
                  <p className="text-sm text-gray-300">
                    Send the total amount above to this M-Pesa till number
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-200 mb-3">
                    M-Pesa Transaction Code
                  </label>
                  <input
                    type="text"
                    value={mpesaCode}
                    onChange={(e) => setMpesaCode(e.target.value)}
                    className="w-full p-4 bg-gray-700 border border-gray-600 rounded-3xl focus:outline-none focus:border-[#32CD32] transition-colors font-medium text-white placeholder-gray-500"
                    placeholder="e.g. QF123456789"
                  />
                </div>

                <button
                  onClick={handleBuy}
                  disabled={isSubmitting || !quantity || !mpesaCode}
                  className="w-full bg-[#32CD32] text-white py-4 rounded-3xl font-bold hover:bg-[#28a428] transition-colors shadow-sm disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Complete Purchase'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}