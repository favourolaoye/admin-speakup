import Sidebar from "../_components/sidebar";
import Wrapper from "./wrapper";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <Wrapper>
      <div className="flex">
        <Sidebar />
        <div className="p-5 flex-1 bg-white">
         
          {children}
        </div>
      </div>
    </Wrapper>
  );
}
