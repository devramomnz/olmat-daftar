"use client";

import React, { ReactNode } from "react";
import TopNav from "../../components/layout/navbar/TopNav";
import SideBar from "../../components/layout/sidebar/SideBar.";
import SideMenu from "../../components/layout/sidebar/SideMenu";
import BackButton from "@/components/layout/BackButton";
import Breadcrumb from "@/components/layout/Breadcrumb";

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
          <div className="flex items-center justify-start pb-2 border-b gap-5">
            <BackButton />
            <Breadcrumb />
          </div>
          <div className="mt-3">{children}</div>
          {/* <Bottom /> */}
        </div>
      </div>
    </>
  );
}
