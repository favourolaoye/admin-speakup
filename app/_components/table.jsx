"use client"

import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import {Trash2, ViewIcon } from "lucide-react";
import { Toaster, toast } from "sonner";

import { useEffect } from "react";
import Link from "next/link";

export default function Table() {
    const report = useAuthStore((state) => state.report);
    const setError = useAuthStore((state) => state.setError);
    const setReport = useAuthStore((state) => state.setReport)

    useEffect(() => {
        async function getReport() {
            const request = await axios.get("https://speakup-api-v2.onrender.com/api/report/retrieve");
            const response = await request.data;
            setReport(response);
        }
        getReport()
    }, [])
    
    const deleteOne = async (id) => {
        try {
            const response = await axios.delete(`https://speakup-api-v2.onrender.com/api/report/${id}`);
             const { msg, error} = response.data;
             toast.success(msg);
             toast.error(msg)
        } catch (error) {
            toast.error("Error deleting report:", error.response?.data?.msg || error.message);
            console.error("Error deleting report:", error.response?.data?.msg || error.message);
        }
    };
    return (
        <div className="w-full mt-5 p-2 flex justify-center">
            <table className="w-full text-left border border-gray-300 rounded-lg overflow-hidden shadow-md shadow-gray-100">
                <thead className="bg-gray-100 text-black">
                    <tr className="p-2">
                        <th className="p-3 border-b border-gray-400">Student Name</th>
                        <th className="p-3 border-b border-gray-400">Student Email</th>
                        <th className="p-3 border-b border-gray-400">Report Type</th>
                        <th className="p-3 border-b border-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {report.length > 0 ? report.map((item) => (
                        <tr key={item._id} className="">
                            <td className="p-3 text-black border-b">{item.studname}</td>
                            <td className="p-3 border-b">{item.mail}</td>
                            <td className="p-3 border-b">
                                <p className="bg-green-200 text-center p-2 w-fit text-xs rounded-md font-semibold text-green-600">{item.category}</p>
                            </td>
                            <td className="p-3 border-b">
                                <div className="flex gap-5 items-center">
                                    <Link href="/dashboard/reports"><ViewIcon size={18} /></Link>
                                    <Trash2 size={18} color="red" onClick={() => deleteOne(item._id)} />
                                </div>
                            </td>
                        </tr>
                    )) :
                        <tr>
                            <td className="text-center text-base p-2">Nothing to see here</td>
                        </tr>}
                </tbody>
            </table>
            <Toaster/>
        </div>

    )
}
