import React from "react";
import { motion } from "framer-motion";
import { PAGEMENU } from "@/constants/pageMenu";
import Link from "next/link";
import Bottom from "./Bottom";

export default function SideMenu() {
  return (
    <>
      <motion.ul className="fixed top-0 z-30 lg:block w-3/4 h-screen p-4 overflow-x-hidden bg-white md:w-1/3 lg:w-64 drop-shadow-lg">
        <div className="relative h-full pt-14 pb-20">
          <h1 className="font-bold text-sm border-b">menu</h1>
          <div className="flex flex-col mt-3 gap-3 h-full overflow-y-scroll no-scrollbar ">
            {PAGEMENU.map((data, i) => (
              <Link
                href={data.url}
                className="flex items-center text-base gap-3"
                key={i}
              >
                {data.icon}
                {data.name}
              </Link>
            ))}
          </div>
          <Bottom />
        </div>
      </motion.ul>
    </>
  );
}
