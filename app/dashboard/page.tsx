"use client"
import Tab from "@/app/_components/tab";
import Table from "@/app/_components/table";
import { useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
export default function page() {
  const setStudent = useAuthStore((state) => state.setStudent);
  const student = useAuthStore((state) => state.student);
   console.log(student)
  useEffect(() => {
    async function getStudents() {
      const request = await axios.get("https://speakup-api-v2.onrender.com/api/student/fetch-all");
      const response = await request.data;
      setStudent(response);
    }
    getStudents()
  }, [])
  return (
    <div className="flex flex-col p-2">
       <Tab/>
       <Table/>
    </div>
  )
}
