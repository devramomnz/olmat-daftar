import AppImage from "@/components/AppImage";
import { appSetting } from "@/constants/appSetting";
import React from "react";
import { IPaymentData } from "../[slug]/usePayment";
import { QRCode } from "antd";
import { PiStudent } from "react-icons/pi";
import { convertRupiah } from "@/helper/common";
import { LiaCashRegisterSolid } from "react-icons/lia";
import { HiOutlineReceiptTax } from "react-icons/hi";
import Image from "next/image";

interface IProps {
  paymentData: IPaymentData;
}

export default function PaymentDetail(props: IProps) {
  const { paymentData } = props;
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
    <>
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
        <p className="text-sm font-bold">{expiredPay} WIB</p>
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
    </>
  );
}
