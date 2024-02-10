import { ROUTES } from "@/prefix/route.constant";
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
  },
  {
    icon: <GiTakeMyMoney />,
    url: ROUTES.TRANSACTION,
    name: "Transaksi",
  },
  {
    icon: <MdAccountCircle />,
    url: ROUTES.ACCOUNT,
    name: "Pengaturan Akun",
  },
];
