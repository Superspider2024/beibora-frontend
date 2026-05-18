"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Shield, Phone, MapPin, Lock, Mail, Type, Eye, EyeOff } from "lucide-react";
import api from "../../lib/api";

export default function SignupPage() {
  const [role, setRole] = useState<"buyer" | "admin">("buyer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    // Expect local format starting with 07 and 10 digits total
    return /^07\d{8}$/.test(phone);
  };

  const normalizePhone = (phone: string) => {
    if (phone.startsWith('07')) return '+254' + phone.slice(1);
    return phone;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const payload: any = Object.fromEntries(formData.entries());
    payload.role = role;

    // Client-side validation
    if (!validateEmail(String(payload.email || ''))) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    if (String(payload.password || '').length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }
    if (!validatePhone(String(payload.number || ''))) {
      setError('Phone must start with 07 and be 10 digits long');
      setLoading(false);
      return;
    }

    // Normalize phone to +254 format
    payload.number = normalizePhone(String(payload.number));

    try {
      const response = await api.post('/auth/register', payload);
      localStorage.setItem('token', response.data.token);
      // Redirect based on role
      if (role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/marketplace';
      }
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white mb-4">Join Beibora</h1>
          <p className="text-gray-300 text-lg">Select your role</p>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-gray-800 rounded-3xl p-2 mb-8 border border-gray-700">
          <button
            type="button"
            onClick={() => setRole("buyer")}
            className={`flex-1 py-4 px-6 rounded-2xl font-bold transition-all ${
              role === "buyer"
                ? "bg-[#1A3636] text-white shadow-sm"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <div className="flex items-center justify-center">
              <User size={20} className="mr-2" />
              Buyer
            </div>
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 py-4 px-6 rounded-2xl font-bold transition-all ${
              role === "admin"
                ? "bg-[#1A3636] text-white shadow-sm"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <div className="flex items-center justify-center">
              <Shield size={20} className="mr-2" />
              Admin
            </div>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-900/20 border border-red-700 rounded-3xl p-4">
              <p className="text-red-300 font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <Type className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-3xl focus:outline-none focus:border-[#32CD32] transition-colors font-medium text-white placeholder-gray-500"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-3xl focus:outline-none focus:border-[#32CD32] transition-colors font-medium text-white placeholder-gray-500"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                placeholder="Password"
                className="w-full pr-12 pl-12 py-4 bg-gray-800 border border-gray-700 rounded-3xl focus:outline-none focus:border-[#32CD32] transition-colors font-medium text-white placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="tel"
                name="number"
                required
                placeholder="Phone Number"
                className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-3xl focus:outline-none focus:border-[#32CD32] transition-colors font-medium text-white placeholder-gray-500"
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="text"
                name="location"
                required
                placeholder="Location"
                className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-3xl focus:outline-none focus:border-[#32CD32] transition-colors font-medium text-white placeholder-gray-500"
              />
            </div>

            {role === "admin" && (
              <div className="relative">
                <Shield className="absolute left-4 top-4 text-gray-400" size={20} />
                <input
                  type="text"
                  name="adminCode"
                  required
                  placeholder="Secret Admin Code"
                  className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-3xl focus:outline-none focus:border-[#32CD32] transition-colors font-medium text-white placeholder-gray-500"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#32CD32] text-white py-4 rounded-3xl font-bold hover:bg-[#28a428] transition-colors shadow-sm disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : `Join as ${role === "buyer" ? "Buyer" : "Admin"}`}
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-[#32CD32] font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}