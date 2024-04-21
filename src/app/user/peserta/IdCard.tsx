"use client";

import React from "react";
import Image from "next/image";
import { IParticipant } from "@/interfaces/IParticipant";

interface IProps {
  card?: IParticipant;
}

export default function IdCard(props: IProps) {
  const { card } = props;
  console.log(card);

  return (
    <>
      <div className="rounded-md border-1 object-fill overflow-hidden text-[8px] font-bold font-montserrat w-56 h-full aspect-[472/665] relative flex justify-center">
        {/* <Image
          src={"/idcard.png"}
          width={475}
          height={685}
          alt="idCard Olmat"
          // fill
          className="object-contain"
        /> */}
        <div>
          <Image
            src={"/idcard.png"}
            alt="idCard Olmat"
            // width={475} height={100}
            fill
            objectFit="center"
          />
        </div>
        <h2 className="absolute top-[157px] left-[45px]">{card?.name}</h2>
        <h2 className="absolute top-[193px] left-[45px]">{card?.id}</h2>
        <h2 className="absolute top-[231.5px] text-[6px] left-[45px]">
          {card?.school_name}
        </h2>
        <h2 className="absolute top-[264px] left-[45px]">{card?.region}</h2>
        {/* </div> */}
        <div className="absolute top-[70.5px] z-50">
          <div className="relative w-[48px] h-[75px] bg-black">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMG_CDN}/imgs/${card?.img}`}
              alt="idCard s"
              fill
            />
          </div>
        </div>
      </div>
    </>
  );
}
