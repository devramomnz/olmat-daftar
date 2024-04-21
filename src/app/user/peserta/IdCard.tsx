"use client";

import React from "react";
import Image from "next/image";
import { IParticipant } from "@/interfaces/IParticipant";

interface IProps {
  card?: IParticipant;
}

export default function IdCard(props: IProps) {
  const { card } = props;

  return (
    <>
      <div className="rounded-md border-1 object-fill overflow-hidden text-[8px] font-bold font-montserrat w-56 h-full aspect-[472/665] relative flex">
        {/* <div className="relative w-[220px] h-[315px]"> */}
        <Image
          src={"/idcard.png"}
          alt="idCard Olmat"
          width={475}
          height={0}
          // fill
          className="object-contain"
        />
        {/* </div> */}
        {/* <Image
          src={"/idcard.png"}
          width={475}
          height={685}
          alt="idCard Olmat"
          // fill
          className="object-contain"
        /> */}

        <h2 className="absolute top-[157px] left-[45px]">{card?.name}</h2>
        <h2 className="absolute top-[193px] left-[45px]">{card?.id}</h2>
        <h2 className="absolute top-[231.5px] text-[6px] left-[45px]">
          {card?.school_name}
        </h2>
        <h2 className="absolute top-[264px] left-[45px]">{card?.region}</h2>
        {/* </div> */}
        <div className="absolute w-full top-[67px] z-50 flex items-center justify-center">
          <div className="relative aspect-[48/71] flex items-center justify-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMG_CDN}/imgs/${card?.img}`}
              alt="idCard"
              width={50}
              height={300}
              // fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
}
