"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Mail, Shield } from "lucide-react";
import api from "../../lib/api";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await api.post('/auth/login', payload);
      localStorage.setItem('token', response.data.token);
      // Redirect based on role
      if (response.data.role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/marketplace';
      }
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-700">

        {/* Header */}
        <div className="bg-[#1A3636] p-8 text-center text-white">
          <h1 className="text-3xl font-black mb-2">Welcome Back</h1>
          <p className="text-gray-300 text-sm">Access the Beibora Protocol</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && <p className="text-red-400 text-center">{error}</p>}

          <div className="relative">
            <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="w-full pl-12 pr-4 py-4 bg-gray-700 border border-gray-600 rounded-3xl focus:outline-none focus:border-[#32CD32] transition-all text-white placeholder-gray-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 bg-gray-700 border border-gray-600 rounded-3xl focus:outline-none focus:border-[#32CD32] transition-all text-white placeholder-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#32CD32] text-white py-4 rounded-3xl font-bold text-lg hover:bg-[#28a428] transition-all disabled:bg-gray-600"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <div className="p-6 text-center border-t border-gray-700 bg-gray-800">
          <p className="text-gray-400 font-medium">
            New to Beibora? <Link href="/signup" className="text-[#32CD32] font-bold hover:underline">Sign up here</Link>
          </p>
        </div>
      </div>
    </main>
  );
}