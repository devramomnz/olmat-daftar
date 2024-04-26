import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Bottom from "./Bottom";
import { useSideBarStore } from "@/hooks/zustand/zustand";
import { useAdminProfile } from "@/hooks/zustand/useAdminProfile";
import { ACCESS } from "@/enum/access.enum";
import { ROUTES } from "@/prefix/routes";
import { MdAccountCircle } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { PiUserListFill } from "react-icons/pi";
import { AiFillDashboard } from "react-icons/ai";

export default function SideMenu() {
  const { type } = useAdminProfile();
  const { setSideBar } = useSideBarStore();

  const PAGEMENU = [
    {
      icon: <AiFillDashboard />,
      url: ROUTES.USER,
      name: "Dashboard",
      access: type?.includes(ACCESS.USER) || type?.includes(ACCESS.ADMIN),
    },
    // {
    //   icon: <FaListCheck />,
    //   url: ROUTES.DAFTAR,
    //   name: "Daftar Olmat",
    // },
    {
      icon: <PiUserListFill />,
      url: ROUTES.PESERTA,
      name: "Data Peserta",
      access: type?.includes(ACCESS.USER) || type?.includes(ACCESS.ADMIN),
    },
    {
      icon: <GiTakeMyMoney />,
      url: ROUTES.TRANSACTION,
      name: "Transaksi",
      access: type?.includes(ACCESS.USER) || type?.includes(ACCESS.ADMIN),
    },
    {
      icon: <MdAccountCircle />,
      url: ROUTES.ACCOUNT,
      name: "Pengaturan Akun",
      access: type?.includes(ACCESS.USER),
    },
  ];

  return (
    <>
      <motion.ul className="fixed top-0 z-30 lg:block w-3/4 h-screen p-4 overflow-x-hidden bg-white md:w-1/3 lg:w-64 drop-shadow-lg">
        <div className="relative h-full pt-14 pb-20">
          <h1 className="font-bold text-sm border-b">menu</h1>
          <div className="flex flex-col mt-3 gap-3 h-full overflow-y-scroll no-scrollbar ">
            {PAGEMENU.map((data, i) => {
              if (data.access) {
                return (
                  <Link
                    href={data.url}
                    className="flex items-center text-base gap-3"
                    key={i}
                    onClick={() => setSideBar(false)}
                  >
                    {data.icon}
                    {data.name}
                  </Link>
                );
              }
            })}
          </div>
          <Bottom />
        </div>
      </motion.ul>
    </>
  );
}
