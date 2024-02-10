"use client";

import React, { ReactNode } from "react";
import TopNav from "../../components/layout/navbar/TopNav";
import SideBar from "../../components/layout/sidebar/SideBar.";
import SideMenu from "../../components/layout/sidebar/SideMenu";

interface ILayout {
  children: ReactNode;
}

export default function UserLayout(props: ILayout) {
  const { children } = props;
  return (
    <>
      <div>
        <TopNav />
        <div className="hidden lg:block z-30">
          <SideMenu />
        </div>
        <SideBar />
        <div className="mt-16 z-0 lg:ml-64 min-h-screen bg-gray-100 p-3">
          <div>{children}</div>
          {/* <Bottom /> */}
        </div>
      </div>
    </>
  );
}
