import AppImage from "@/components/AppImage";
import Link from "next/link";
import React from "react";
import cathaBot from "@/../public/cathaBotLogo.png";
import { appSetting } from "@/constants/appSetting";

export default function Bottom() {
  return (
    <div className="h-16 absolute bottom-20 lg:bottom-2 grid place-items-center">
      <p className="text-xs grid place-items-center text-center">
        © Copyright 2024 {appSetting.copyright} All rights reserved
        <span className="font-bold">
          <Link
            href={"https://cathabot.com/"}
            target="_blank"
            className="flex items-center gap-2"
          >
            Powered By
            <AppImage className="w-5 h-5" src={cathaBot} alt="cathabot" />
            CathaBot
          </Link>
        </span>
      </p>
    </div>
  );
}
