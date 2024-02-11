import React, { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import { useSideDaftar } from "@/hooks/zustand/zustand";

interface IProps {
  children: ReactNode;
}

export default function SideBarDaftar(props: IProps) {
  const { children } = props;
  const { sideBar, setSideBar } = useSideDaftar();

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
      className="fixed overflow-hidden z-30 h-screen pb-4"
    >
      <motion.ul className="fixed top-0 z-30 pt-12 pb-10 lg:block w-3/4 h-screen overflow-y-scroll no-scrollbar overflow-x-hidden bg-white md:w-1/3 lg:w-64 drop-shadow-lg ">
        <div className=" mx-4 flex flex-col gap-3 ">{children}</div>
      </motion.ul>
      <button
        onClick={() => {
          setSideBar(false);
        }}
        className={`${sideBar && "w-screen"} lg:hidden h-screen duration-300 `}
      ></button>
    </motion.div>
  );
}
