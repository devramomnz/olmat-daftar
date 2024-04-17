"use client";

import React from "react";
import useIdCard from "./useIdCard";
import Image from "next/image";
import { TbCloudDownload } from "react-icons/tb";

export default function IdCard() {
  const { card } = useIdCard();
  console.log(card);
  return (
    <div className="grid place-items-center ">
      <div className="bg-white items-center w-fit rounded-md drop-shadow p-6 flex flex-col justify-center gap-3">
        <div className="w-fit p-2 bg-white rounded-md border-1">
          <div className="w-96 h-full relative aspect-[620/874]">
            <Image src={"/idcard.png"} alt="idCard Olmat" className="" fill />
          </div>
        </div>
        <button
          type="button"
          className="p-1 font-university mb-2 mr-2 w-fit flex items-center gap-2 text-sm font-bold rounded-md text-center bg-brand  hover:text-white hover:bg-brand-semi duration-500  focus:outline-none focus:ring-red-300 "
        >
          <TbCloudDownload />
          Download
        </button>
      </div>
    </div>
  );
}
