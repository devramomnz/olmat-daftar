import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { MdAccountCircle } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useAdminProfile } from "@/hooks/zustand/useAdminProfile";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import api from "@/config/axiosConfig";

export default function AccountMenu() {
  const { name } = useAdminProfile();

  const router = useRouter();

  function handleLogOut() {
    try {
      api.post(`/auth/user/logout`);
      deleteCookie("_CToken");
      router.push("/");
    } catch (error) {
      alert("failed");
    }
  }
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <button className="flex items-center text-white md:gap-3 md:px-4 md:py-1 bg-brand/20 rounded-xl">
            <h2 className="hidden font-bold md:block">{name}</h2>
            <MdAccountCircle className="text-2xl" />
          </button>
        </DropdownTrigger>
        <DropdownMenu
          // variant="flat"
          aria-label="Static Actions"
          // className="w-fit"
        >
          <DropdownItem className="flex items-center px-2 py-1 duration-300 rounded-md hover:bg-gray-100 hover:text-red-600">
            {name}
          </DropdownItem>
          <DropdownItem className="flex items-center px-2 py-1 duration-300 border-t rounded-md hover:bg-gray-100 hover:text-red-600">
            <button
              onClick={handleLogOut}
              className="flex items-center gap-1 w-full"
            >
              <RiLogoutBoxRLine /> Keluar
            </button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
