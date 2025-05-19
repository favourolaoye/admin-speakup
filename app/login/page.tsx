"use client";
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore'; 
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { LoaderCircle } from 'lucide-react';
import { toast, Toaster } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loading = useAuthStore((state) => state.loading);
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);
  const router = useRouter();

  useEffect(() => {
    const guy = Cookies.get('token');
    if (guy) {
      toast.success("Logged successfully");
      router.push("/dashboard");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://speakup-api-v2.onrender.com/api/admin/login', { email, password });
      const { msg, adminData, token, err } = res.data;
      const username = adminData.name;
      setUser(username);
      const serilized = JSON.stringify(adminData);
      setToken(token);
      Cookies.set('token', token, { expires: 7 });
      Cookies.set('user', serilized, { expires: 7 });
      setError(msg);
      toast.success("auth success");
      setLoading(false);

      setTimeout(() => {
        router.push('/dashboard');
      }, 1000)
    } catch (error: any) {
      console.error('Login failed', error);
      let message = error?.response?.data?.msg;
      setError(message);
      toast.error(message);
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2 mt-2">Tellio</h1>
        <h2 className="text-lg text-black mb-6">Welcome back!</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            {loading ? (
              <button
                type="button"
                className="w-full flex justify-center items-center bg-gray-200 text-gray-500 font-semibold p-3 rounded-lg cursor-not-allowed"
                disabled
              >
                <LoaderCircle className="mr-2 animate-spin size-5" />
                Processing…
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-black text-white font-semibold p-3 rounded-lg hover:bg-gray-900 transition duration-200"
              >
                Login
              </button>
            )}
          </div>
        </form>
      </div>
      <Toaster position="top-right" />
    </div>

  );
}
