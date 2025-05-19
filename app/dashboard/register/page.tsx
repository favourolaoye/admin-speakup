'use client';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export default function RegisterAdminPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { mutate, isPending } = useMutation<
    any, 
    import('axios').AxiosError,
    { username: string; email: string; password: string }
  >({
    mutationFn: async (data) => {
      const response = await axios.post('https://speakup-api-v2.onrender.com/api/admin/register', data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.msg || 'Admin registered successfully!');
      setFormData({ username: '', email: '', password: '' });
    },
    onError: (error: import('axios').AxiosError) => {
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        'Registration failed!';
      toast.error(errorMessage);
    },
  });

  const handleChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-xs shadow-green-200">
      <h2 className="text-2xl font-semibold mb-4 text-center">Register Admin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
            placeholder='enter name'
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-2 rounded text-white ${
            isPending ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isPending ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
