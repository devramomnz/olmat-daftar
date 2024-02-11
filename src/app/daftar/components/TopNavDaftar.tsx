"use client";

import React from "react";
import { useSideDaftar } from "@/hooks/zustand/zustand";
import { IoClose, IoMenu } from "react-icons/io5";
import OlmatIcon from "@/assets/OlmatIcon";

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
          className="absolute lg:hidden w-12 left-2"
        >
          {sideBar ? (
            <IoClose className="text-2xl text-white" />
          ) : (
            <IoMenu className="text-2xl text-white" />
          )}
        </button>
      </div>
      <OlmatIcon className="text-2xl text-white" />
    </div>
  );
}
