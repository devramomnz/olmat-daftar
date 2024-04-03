"use client";

import React from "react";
import { useSideDaftar } from "@/hooks/zustand/zustand";
import { IoClose } from "react-icons/io5";
import OlmatIcon from "@/assets/OlmatIcon";
import { PiStudentBold } from "react-icons/pi";

export default function TopNavDaftar() {
  const { sideBar, setSideBar } = useSideDaftar();
  return (
    <div
      className={`fixed top-0 z-50 bg-brand-dark w-screen drop-shadow-sm transition-transform duration-1000 flex items-center justify-center h-14 bg-dark-light/90`}
    >
      <div className="py-2 flex items-center">
        <button
          onClick={() => {
            setSideBar(!sideBar);
          }}
          className="absolute md:hidden left-2"
        >
          {sideBar ? (
            <IoClose className="text-2xl text-white" />
          ) : (
            <div className="flex bg-brand rounded-md px-3 gap-2 items-center relative">
              <PiStudentBold />
              <h3 className="text-nowrap  font-bold">List Peserta</h3>
              {/* <IoMenu className="text-2xl text-white" / */}
            </div>
          )}
        </button>
      </div>
      <OlmatIcon className="text-2xl hidden md:block text-white" />
    </div>
  );
}
