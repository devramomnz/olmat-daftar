"use client";

import React from "react";
import { useSideBarStore } from "@/hooks/zustand/zustand";
import { IoClose, IoMenu } from "react-icons/io5";
import OlmatIcon from "@/assets/OlmatIcon";
import AccountMenu from "./AccountMenu";

export default function TopNav() {
  const { sideBar, setSideBar } = useSideBarStore();

  return (
    <div
      className={`fixed top-0 z-50 bg-brand-dark w-screen drop-shadow-sm transition-transform duration-1000 flex items-center justify-center h-16 bg-dark-light/90`}
    >
      <div className="flex items-center py-2">
        <button
          onClick={() => {
            setSideBar(!sideBar);
          }}
          className="absolute w-12 lg:hidden left-2"
        >
          {sideBar ? (
            <IoClose className="text-2xl text-white" />
          ) : (
            <IoMenu className="text-2xl text-white" />
          )}
        </button>
      </div>
      <OlmatIcon className="text-lg text-white md:text-2xl" />
      <div className="absolute right-3 md:right-10">
        <AccountMenu />
      </div>
    </div>
  );
}
