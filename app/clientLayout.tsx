'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import Cookies from 'js-cookie';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const setToken = useAuthStore((state) => state.setToken);
  const token = useAuthStore((state) => state.token);
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken && !token) {
      setToken(storedToken);
    }
  }, [token, setToken]);



  return <>{children}</>;
}
