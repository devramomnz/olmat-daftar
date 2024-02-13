import React from "react";
import AppImage from "@/components/AppImage";
import Link from "next/link";
import { appSetting } from "@/constants/appSetting";

interface IProps {
  className: string;
}

export default function OlmatIcon(props: IProps) {
  const { className } = props;
  return (
    <Link
      href={""}
      className="flex justify-center h-full gap-3 font-montserrat items-center"
    >
      <AppImage
        src={appSetting.logoEvent}
        className="w-10 my-1"
        alt="olmat-logo"
      />
      <h1 className={`${className} font-black`}>OLMAT UINSA</h1>
    </Link>
  );
}
