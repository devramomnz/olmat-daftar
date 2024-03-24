"use client";

import React from "react";
import AppImage from "@/components/AppImage";
import { appSetting } from "@/constants/appSetting";
import { QRCode } from "antd";
import { LiaCashRegisterSolid } from "react-icons/lia";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { convertRupiah } from "@/helper/common";
import { PiStudent } from "react-icons/pi";
import Image from "next/image";
import usePayment from "../user/transaction/[slug]/usePayment";

export default function Payment() {
  const { paymentData } = usePayment();
  const expiredPay = new Date(paymentData.expiredDate).toLocaleString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 gap-y-3">
      <div className="bg-white p-4  text-center flex flex-col justify-center w-full gap-3 rounded-xl drop-shadow-md ">
        <div className="flex flex-col text-white font-montserrat items-center">
          <AppImage
            src={appSetting.logoEvent}
            className="w-16 h-16 "
            alt="olmat-logo"
          />
        </div>
        <div className="border-t-2  border-brand-dark pt-4">
          <h2 className="font-black text-lg text-center">
            Selesaikan Pembayaran Sebelum
          </h2>
          <p className="text-sm font-bold">{expiredPay}</p>
        </div>

        <div className="flex flex-col gap-3 border-t-2 border-brand-dark pt-4">
          <div className="">
            <h2>Metode Pembayaran Otomatis</h2>
            <h2 className="font-black">{paymentData.code}</h2>
          </div>
          <div className="flex flex-col items-center">
            <QRCode value={paymentData.qrString} size={250} />
          </div>
        </div>
        <h2 className="text-start font-bold border-b-2">Rincian Pembayaran</h2>
        <div className="flex font-bold flex-col gap-1 text-sm ">
          <div className="flex text-center justify-between w-full">
            <h2 className="flex items-center gap-2">
              <PiStudent /> Total Peserta
            </h2>
            <h2 className="font-black">{convertRupiah(paymentData.amount)}</h2>
          </div>
          <div className="flex text-center justify-between w-full">
            <h2 className="flex items-center gap-2">
              <LiaCashRegisterSolid />
              Jumlah Biaya
            </h2>
            <h2 className="font-black">{convertRupiah(paymentData.amount)}</h2>
          </div>
          <div className="flex text-center justify-between w-full">
            <h2 className="flex items-center gap-2">
              <HiOutlineReceiptTax />
              Biaya Admin Qris
            </h2>
            <h2 className="font-black">{convertRupiah(paymentData.fee)}</h2>
          </div>
          <div className="flex text-center pt-2 border-t-2 border-t-brand-semi justify-between w-full">
            <h2 className="flex items-center gap-2">Total Pembayaran</h2>
            <h2 className="font-black">
              {convertRupiah(paymentData.totalAmount)}
            </h2>
          </div>
        </div>
        <div className="flex items-center text-xs font-bold justify-center gap-2 pt-4">
          <h2>Powered By</h2>
          <div className="relative w-20 aspect-[3/1]">
            <Image
              alt="xendit"
              src={
                "https://www.xendit.co/wp-content/uploads/2020/03/XENDIT-LOGOArtboard-1@2x-1024x441.png"
              }
              fill
            />
          </div>
        </div>
      </div>
      <div className="bg-white py-8 col-span-2 text-center flex flex-col justify-center w-full  px-4 rounded-xl drop-shadow-md "></div>
    </div>
  );
}
