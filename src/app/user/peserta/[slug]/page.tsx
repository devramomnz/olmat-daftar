"use client";

import React from "react";
import useIdCard from "./useIdCard";
import Image from "next/image";
import { TbCloudDownload } from "react-icons/tb";

export default function IdCard() {
  const { card, idCardPdf, downloadPdf } = useIdCard();

  console.log(card);
  return (
    <div className="grid place-items-center ">
      <div className="bg-white items-center w-fit rounded-md drop-shadow p-6 flex flex-col justify-center gap-3">
        <div className="w-fit p-2 relative bg-white rounded-md border-1 font-bold font-montserrat">
          <div
            ref={idCardPdf}
            className="w-56 md:w-96 flex justify-center h-full relative aspect-[360/477]"
          >
            <Image src={"/idcard.png"} alt="idCard Olmat" className="" fill />
            <div className="absolute ">
              <div className="relative w-[83px] h-[110px] top-[114px] aspect-[4/6] z-50">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_CDN}/imgs/${card?.img}`}
                  // src={
                  //   "http://localhost:8000/imgs/imgs-1713266078277-844062203.webp"
                  // }
                  alt="idCard Olmat"
                  className=""
                  fill
                />
              </div>
            </div>
            <h2 className="absolute top-[263px] left-[85px]">{card?.name}</h2>
            <h2 className="absolute top-[322px] left-[85px]">{card?.id}</h2>
            <h2 className="absolute top-[378px] left-[85px]">{card?.school}</h2>
            <h2 className="absolute top-[436px] left-[85px]">{card?.region}</h2>
          </div>
        </div>
        <button
          type="button"
          onClick={downloadPdf}
          className="p-1 font-university mb-2 mr-2 w-fit flex items-center gap-2 text-sm font-bold rounded-md text-center bg-brand  hover:text-white hover:bg-brand-semi duration-500  focus:outline-none focus:ring-red-300 "
        >
          <TbCloudDownload />
          Download
        </button>
      </div>
    </div>
  );
}
