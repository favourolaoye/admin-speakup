"use client"

import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";


export default function Wrapper({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();
    // const user = useAuthStore((state) => state.user)
    const setUser = useAuthStore((state) => state.setUser)
    const setStudent = useAuthStore((state) => state.setStudent);
    useEffect(() => {
        const storedUser = Cookies.get('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                console.log(parsedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Failed to parse user cookie:', error);
            }
        }
    }, [setUser]);


    return <>
    <QueryClientProvider client={queryClient}>
     {children}
    </QueryClientProvider>
   
    </>
    
}
