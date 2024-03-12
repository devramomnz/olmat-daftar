"use client";

import AppImage from "@/components/AppImage";
import { appSetting } from "@/constants/appSetting";
import { convertRupiah } from "@/helper/common";
import { useParticipantPay } from "@/hooks/zustand/useParticipantPay";
import { QRCode } from "antd";
import Image from "next/image";
import React from "react";

export default function Payment() {
  const {
    expired,
    invoice,
    participantAmount,
    payAmount,
    qrString,
    participantData,
  } = useParticipantPay();
  return (
    <div className="lg:grid lg:grid-cols-2">
      <div className="bg-brand-dark hidden lg:block min-h-screen">
        <div className="flex flex-col justify-center text-white h-full mb-20 font-montserrat items-center">
          <AppImage
            src={appSetting.logoEvent}
            className="w-60 h-60 m-10"
            alt="olmat-logo"
          />
          <h1 className="text-3xl font-black">{appSetting.eventName}</h1>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6 overflow-y-scroll text-black w-full h-fit items-center">
        <div className="flex flex-col justify-center  font-montserrat items-center">
          <AppImage
            src={appSetting.logoEvent}
            className="w-20 h-20"
            alt="olmat-logo"
          />
        </div>

        <h2 className="font-black text-2xl text-center">
          Selesaikan Pembayaran Sebelum
        </h2>
        <p>{expired}</p>

        <div className="bg-white rounded-lg drop-shadow-md p-4 w-fit">
          <QRCode value={qrString} size={250} />
          <div className="relative aspect-[2/1] ">
            <Image
              alt="QRIS"
              src={
                "https://www.xendit.co/wp-content/uploads/2020/03/iconQris.png"
              }
              fill
            />
          </div>
        </div>

        <div className="border-y-1 w-full py-2 border-gray-500 text-xs flex flex-col gap-2">
          <div className="grid grid-cols-3">
            <h2 className="font-bold">No. Invoice</h2>
            <p className="col-span-2 text-end">{invoice}</p>
          </div>

          <div className="grid grid-cols-3">
            <h2 className="font-bold">Jumlah Peserta</h2>
            <p className="col-span-2 text-end">{participantAmount} Peserta</p>
          </div>
          <div className="grid grid-cols-3">
            <h2 className="font-bold">Total Pembayaran</h2>
            <p className="col-span-2 text-end">{convertRupiah(payAmount)}</p>
          </div>
        </div>
        <div className="w-full text-xs">
          <table className="w-full">
            <thead className="w-full ">
              <tr className="bg-brand">
                <th>No</th>
                <th>Nama</th>
                <th>Jenis Kelamin</th>
                <th>Tanggal Lahir</th>
              </tr>
            </thead>
            <tbody>
              {participantData.map((data, i) => (
                <tr key={i} className="text-center">
                  <td>{i + 1}</td>
                  <td className="text-start">{data.name}</td>
                  <td>{data.gender}</td>
                  <td>{data.birth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
