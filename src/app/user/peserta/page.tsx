"use client";

import React from "react";
import TablePeserta from "../components/TablePeserta";

export default function Peserta() {
  return (
    <>
      <label className="font-bold">Data Peserta</label>
      <div className="w-full p-4 bg-white mt-5 rounded-md drop-shadow-md overflow-x-scroll">
        <TablePeserta />
      </div>
    </>
  );
}
