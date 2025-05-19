'use client' 
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, PanelsTopLeft, MessageSquareWarning, Ban, UserCog, LogOut, User } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import Cookies from 'js-cookie'
import {toast, Toaster} from "sonner";
const links = [
  { id: 1, name: 'Dashboard', link: '/dashboard', icon: <PanelsTopLeft /> },
  { id: 2, name: 'Reports', link: '/dashboard/reports', icon: <MessageSquareWarning/> },
  { id: 3, name: 'Spam', link: '/dashboard/spam', icon: <Ban/>},
  { id: 4, name: "Register", link: '/dashboard/register', icon: <User/>},
  { id: 5, name: 'Settings', link: '/dashboard/settings', icon: <UserCog/>}
]


export default function Sidebar() {
  const router = useRouter()
const setUser = useAuthStore((state) => state.setUser);
const setToken = useAuthStore((state) => state.setToken);
const setError = useAuthStore((state) => state.setError)
    const handleLogout = () => {
      toast.success("Logged out");
      setUser(null);
      setToken(null);
      setError(null);
      Cookies.remove('token')
      Cookies.remove('user')
      router.push("/login");
    }
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-[250px] bg-gray-50 h-[100vh] shadow-md border-r-1 border-gray-200">
      <div className="flex p-5 gap-5 items-center">
        <LayoutDashboard />
        <h3 className="text-xl font-semibold">Dashboard</h3>
      </div>

      <div className="flex font-medium justify-center w-full mt-10">
        <div className="flex flex-col w-[85%] gap-5">
          {links.map((item) => {
            const isActive = pathname === item.link

            return (
              <div
                key={item.id}
                className={`flex gap-5 items-center rounded-md p-3 transition-colors ${
                  isActive ? 'bg-green-100' : ''
                }`}
              >
                <span>{item.icon}</span>
                <Link
                  href={item.link}
                  className={`transition-colors ${
                    isActive ? 'text-green-500 font-semibold text-base' : 'text-[#8592ad]'
                  }`}
                >
                  {item.name}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex w-full justify-center mt-30 p-3">
        <div className="flex w-[85%] gap-5 text-red-400 font-semibold">
          <LogOut/>
          <button className='text-red-500' onClick={handleLogout}>Logout</button>
        </div>
        
      </div>
      <Toaster position='top-right'/>
    </div>
  )
}
