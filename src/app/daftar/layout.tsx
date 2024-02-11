"use client";

import React, { ReactNode } from "react";
import TopNavDaftar from "./components/TopNavDaftar";

interface ILayout {
  children: ReactNode;
}

export default function UserLayout(props: ILayout) {
  const { children } = props;
  return (
    <>
      <div>
        <TopNavDaftar />
        {/* <SideMenuDaftar /> */}
        <div className="mt-14 min-h-screen bg-gray-100 ">
          <div>{children}</div>
          {/* <Bottom /> */}
        </div>
      </div>
    </>
  );
}
