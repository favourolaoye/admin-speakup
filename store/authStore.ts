"use client";
import { create } from 'zustand';


interface T{
    report : string | null
}

interface  IAuth {
    user:  string | null;
    loading:  boolean;
    token: string | null;
    error:  string | null;
    report: Array<any> | null
    storedata: Array<any> | []
    spamdata: Array<any> | []
    student: Array<any> | []
    setUser: (user: string | null ) => void,
    setError: (error: string | null ) => void,
    setLoading: (loading: boolean) => void,
    setToken: (token: string | null) => void,
    setReport: (report: Array<T> | null) => void,
    setstoreData: (data: Array<any> | []) => void,
    setspamData: (data: Array<any> | []) => void,
    setStudent: (student: Array<any> | []) => void
}

export const useAuthStore = create<IAuth>((set) => ({
    setStudent: (student) => set({student}),
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    setLoading: (loading) => set({ loading }),
    setReport: (report) => set({report}),
    setError: (error) => set({error}),
    setstoreData: (storedata) => set({storedata}),
    setspamData: (spamdata) => set({spamdata}),
    user: null,
    token: null,
    loading: false,
    report: [],
    error: null,
    spamdata: [],
    storedata: [],
    student: []
}));

