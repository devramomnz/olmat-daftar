import React, { useEffect } from "react";
import { motion } from "framer-motion";
import SideMenu from "./SideMenu";
import { useSideBarStore } from "@/hooks/zustand/zustand";

export default function SideBar() {
  const { sideBar, setSideBar } = useSideBarStore();

  const variants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { ease: "easeIn" },
    },
    closed: {
      x: -500,
      opacity: 0,
      // display: "none",
      transition: { ease: "easeOut" },
    },
  };

  useEffect(() => {
    if (sideBar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sideBar]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSideBar(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial={{ x: -500 }}
      animate={sideBar ? "open" : "closed"}
      variants={variants}
      className="fixed overflow-hidden z-30 h-screen"
    >
      <SideMenu />
      <button
        onClick={() => {
          setSideBar(false);
        }}
        className={`${sideBar && "w-screen"} lg:hidden h-screen duration-300 `}
      ></button>
    </motion.div>
  );
}
