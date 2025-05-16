"use client"
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import Loading from "@/app/_components/loading";
import { Mail, Trash2 } from "lucide-react";
import { toast, Toaster } from "sonner"
import axios from "axios";
type Report = {
  _id: string;
  studname: string;
  report: string;
  category: string;
  mail: string;
  details?: string;
  createdAt: string;
};

export default function Page() {
  const setstoreData = useAuthStore((state) => state.setstoreData);
  const storedata = useAuthStore((state) => state.storedata) as Report[];
  const Merror = useAuthStore((state) => state.error)
  const setError = useAuthStore((state) => state.setError)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [ShowEmailPopup, setShowEmailPopup] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const { isPending, data, error } = useQuery<Report[]>({
    queryKey: ['reports'],
    queryFn: () =>
      fetch('https://speakup-api-v2.onrender.com/api/report/retrieve').then((res) => res.json()),
  });





  const handleSendEmail = async (student: any, subject: any, text: any) => {
    try {
      let req = await axios.post("https://speakup-api-v2.onrender.com/api/report/sendmail", { student, subject, text })
      const { msg, data } = req.data;
      setError(msg);
      console.log(data.error);
      toast.error(data.error);
      toast.success(msg);
      setShowEmailPopup(false);
    }
    catch (error: any) {
      setError(error);
    }
  };


  useEffect(() => {
    if (data) {
      setstoreData(data);
    }
  }, [data, setstoreData]);

const handleDelete = async (id: any) => {
  if (!id || id === null || id === "") {
    toast.error("Nothing to delete here!");
    return; 
  }

  try {
    const response = await axios.delete(`https://speakup-api-v2.onrender.com/api/report/${id}`);
    console.log(response);

    const { msg, err } = response.data;

    if (msg) {
      toast.success(msg);
      setTimeout(() => {
        window.location.reload(); 
      }, 1500); 
  }
   
    if (err) toast.error(err);             

  } catch (error: any) {
    const errorMsg = error.response?.data?.msg || error.message || "Unknown error occurred";
    toast.error(`Error deleting report: ${errorMsg}`);
    console.error("Error deleting report:", errorMsg);
  }
};



  useEffect(() => {
    if (storedata && storedata.length > 0 && !selectedReport) {
      setSelectedReport(storedata[0]);
    }
  }, [storedata, selectedReport]);

  if (isPending) return <Loading />;

  if (error) {
    toast.error(error.message);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[250px] border-r border-gray-200 flex flex-col overflow-y-auto">
        <h2 className="p-2 text-lg font-semibold sticky top-0 bg-white z-10">All Cases</h2>
        <ul className="flex-1 overflow-y-auto">
          {storedata.length > 0 ? (
            storedata.map((report: Report) => (
              <li
                key={report._id}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedReport?._id === report._id ? "bg-green-100" : ""
                  }`}
                onClick={() => setSelectedReport(report)}
              >
                <h3 className="font-medium text-sm truncate">{report.studname}</h3>
                <p className="text-xs text-gray-500 truncate">{report.report}</p>
                <span className="text-xs text-gray-400">{report.category}</span>
              </li>
            ))
          ) : (
            <p className="p-4 text-sm text-gray-500">No reports yet!</p>
          )}
        </ul>
      </aside>

      {/* Detail Panel */}
      <main className="flex-1 p-6 overflow-y-auto">
        {selectedReport !== null ? (
          <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <span className={`px-3 py-1 rounded-md font-medium 
                ${selectedReport.category === "spam" ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"}`}>
                {selectedReport.category}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Submitted:{" "}
              {new Date(selectedReport.createdAt).toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </p>

            <h1 className="text-xl font-bold text-gray-900">{selectedReport.studname}</h1>
            <p className="text-gray-600">{selectedReport.mail}</p>

            <div className="bg-gray-100 p-4 rounded-md">
              <p className="text-sm text-gray-800 whitespace-pre-line">
                {selectedReport.report}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic">Select a case to view details</p>
        )}

        {/* actions */}
        <div className="flex space-x-4 mt-6 border-t pt-4">
          <button
            className="flex items-center space-x-2 text-red-600 hover:text-red-800"
            onClick={() => selectedReport && handleDelete(selectedReport._id)} // implement this function
          >
            <Trash2 className="w-5 h-5" />
            <span>Delete</span>
          </button>

          <button
            className="flex items-center space-x-2 text-green-400 hover:text-green-800"
            onClick={() => setShowEmailPopup(true)}
          >
            <Mail className="w-5 h-5" />
            <span>Write</span>
          </button>
        </div>
        {/* popup */}
        {ShowEmailPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 animate-in fade-in duration-200">
            <div
              className="absolute inset-0 bg-gray-800/60 backdrop-blur-[2px] transition-opacity"
              onClick={() => setShowEmailPopup(false)}
            ></div>
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative z-10 animate-in zoom-in-95 duration-150">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Send Email to {selectedReport?.studname}</h2>
                <button
                  onClick={() => setShowEmailPopup(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="email-subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    id="email-subject"
                    type="text"
                    placeholder="Enter email subject"
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="email-body" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="email-body"
                    placeholder="Write your message here..."
                    className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition h-36 resize-none"
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onClick={() => setShowEmailPopup(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => handleSendEmail(selectedReport?.mail, emailSubject, emailBody)}
                  >
                    Send Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
        }
      </main>
      <Toaster />
    </div>
  );
}
