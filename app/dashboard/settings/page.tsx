"use client";

import { useAuthStore } from '@/store/authStore'; 
import moment from 'moment';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
export default function Page() {
  // Define a User type if not already defined
  type User = {
    name: string;
    email: string;
    createdAt: string | Date;
    // add other fields as needed
  };
  const router = useRouter();

  const user = useAuthStore((state) => state.user) as unknown as User;
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  if (!user) return <div className="p-6 text-center">Loading...</div>

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove('token');
    Cookies.remove('user');
    setTimeout(() => {
      router.push("/login");
    })
  }
  return (
    <div className="h-full py-10 px-4">
      <div className="max-w-2xl mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Account Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              value={user.name}
              readOnly
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Joined</label>
            <input
              type="text"
              value={moment(user.createdAt).format('MMMM Do YYYY, h:mm A')}
              readOnly
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="bg-red-200 text-red-400 px-4 font-semibold py-2 rounded-md" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
