import { ROUTES } from "@/prefix/routes";
import { AiFillDashboard } from "react-icons/ai";
// import { FaListCheck } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";

export const PAGEMENU = [
  {
    icon: <AiFillDashboard />,
    url: ROUTES.USER,
    name: "Dashboard",
    access: ["user", "Admin"],
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
    access: ["user", "Admin"],
  },
  {
    icon: <GiTakeMyMoney />,
    url: ROUTES.TRANSACTION,
    name: "Transaksi",
    access: ["user", "Admin"],
  },
  {
    icon: <MdAccountCircle />,
    url: ROUTES.ACCOUNT,
    name: "Pengaturan Akun",
    admin: false,
    access: ["user"],
  },
];
