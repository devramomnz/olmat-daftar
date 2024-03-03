"use client";

import { appSetting } from "@/constants/appSetting";
import { useLayout } from "@/hooks/zustand/layout";
import { useAdminProfile } from "@/hooks/zustand/useAdminProfile";
import { ROUTES } from "@/prefix/route.constant";
import Link from "next/link";
import React from "react";
import { IoTimeOutline, IoWarning } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { PiStudentBold } from "react-icons/pi";

export default function Home() {
  const { name, degreeName, schoolName } = useAdminProfile();
  const {} = useLayout();
  const paid = 0;
  const success = 2;
  return (
    <>
      <div className="flex items-center justify-between">
        <label className="font-bold">Dashboard</label>
        <Link href={ROUTES.DAFTAR}>
          <button className="py-1 px-3 w-full bg-brand-dark text-white rounded-lg">
            Daftar Sekarang
          </button>
        </Link>
      </div>
      <div className="w-full grid md:grid-cols-2 gap-5">
        <div className="w-full items-start bg-white mt-5 p-3 overflow-hidden rounded-md drop-shadow-md">
          <h2 className="font-bold border-b w-full text-start flex items-center gap-2 mb-4">
            <LuUser2 /> Akun
          </h2>
          <div className="grid-cols-3 text-sm grid">
            <h1 className="w-fit">Nama</h1>
            <h1 className="w-fit col-span-2">: {name}</h1>
            <h1 className="w-fit">Jenjang</h1>
            <h1 className="w-fit col-span-2">: {degreeName}</h1>
            <h1 className="w-fit">Sekolah</h1>
            <h1 className="w-fit col-span-2">: {schoolName}</h1>
          </div>
        </div>
        <div className="w-full items-start bg-white mt-5 p-3 overflow-hidden rounded-md drop-shadow-md">
          <h2 className="font-bold border-b w-full text-start flex items-center gap-2 mb-4">
            <IoTimeOutline />
            Penutupan Pendaftaran
          </h2>
          <h1 className="w-fit">
            Pendaftaran ditutup pada tanggal{" "}
            <span className="font-bold">{appSetting.endDate}</span>
          </h1>
        </div>
        {/* <div className="w-full bg-white mt-5 overflow-hidden rounded-md drop-shadow-md">
          <div className="bg-brand-dark h-10 grid place-items-center">
            <h2 className="font-bold text-white">Pendaftaran Peserta</h2>
          </div>
          <div className="p-3">
            <h2>Hi {userName}</h2>
          </div>
        </div> */}
        <div className="w-full items-start bg-white mt-5 p-3 overflow-hidden rounded-md drop-shadow-md">
          <h2 className="font-bold border-b w-full text-start flex items-center gap-2">
            <span className="text-xl text-red-700">
              <IoWarning />
            </span>
            Menunggu Pembayaran
          </h2>
          <h2 className="w-fit mt-3">
            {paid
              ? ",ada pembayaran yang belum kamu selesaikan"
              : "Yuk segera daftar sebelum kuota penuh"}
          </h2>
          <button
            className={`${
              !paid && "hidden"
            } py-1 px-3 w-full mt-3 bg-brand-dark text-white rounded-lg`}
          >
            Bayar Sekarang
          </button>
        </div>
        <div className="w-full items-start bg-white mt-5 p-3 overflow-hidden rounded-md drop-shadow-md">
          <h2 className="font-bold border-b w-full text-start flex items-center gap-2 mb-4">
            <PiStudentBold />
            Peserta yang telah terdaftar
          </h2>
          <Link href={ROUTES.PESERTA} className="w-fit">
            {success} peserta telah terdaftar
          </Link>
        </div>
      </div>
    </>
  );
}
