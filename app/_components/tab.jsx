"use client";

import { PiHandWavingFill } from "react-icons/pi";
import { LuUsers } from "react-icons/lu";
import { TbMessageReportFilled } from "react-icons/tb";
import { RiSpam2Fill } from "react-icons/ri";
import { useAuthStore } from "@/store/authStore";

const iconWrapperStyle =
  "flex w-[60px] h-[60px] rounded-full bg-green-200 items-center justify-center";
const statBoxStyle = "flex items-center gap-2";

const stats = [
  {
    label: "Total Students",
    valueKey: "students",
    Icon: LuUsers,
  },
  {
    label: "Total Reports",
    valueKey: "report",
    Icon: TbMessageReportFilled,
  },
  {
    label: "Spam",
    valueKey: "spam",
    Icon: RiSpam2Fill,
  },
];

export default function Tab() {
  const user = useAuthStore((state) => state.user);
  const report = useAuthStore((state) => state.report);
  const spamData = useAuthStore((state) => state.spamdata);
  const students = useAuthStore((state) => state.student)


  const getValue = (valueKey) => {
  if (valueKey === "report") return report.length;
  if (valueKey === "spam") return spamData.length;
  if (valueKey === "students") return students.length;
  return;
};
  return (
    <div>
      <div className="flex gap-2 items-center text-xl font-semibold mt-1">
        <h2>Hello,</h2>
        <h3>{user?.name}</h3>
        <PiHandWavingFill size={25} fill="brown" />
      </div>

      <div className="flex mt-5 w-full rounded-2xl bg-white p-3 justify-center shadow-xs shadow-green-300">
        <div className="flex w-[90%] justify-between">
          {stats.map(({ label, value, valueKey, Icon }) => (
            <div key={label} className={statBoxStyle}>
              <span className={iconWrapperStyle}>
                <Icon size={25} fill="green" color="green"/>
              </span>
              <div className="flex flex-col">
                <span className="text-gray-400">{label}</span>
                <h3 className="font-semibold">
                  {getValue(valueKey)}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
