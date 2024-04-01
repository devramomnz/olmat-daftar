"use client";

import React from "react";
import TablePayWaiting from "../components/TablePayWaiting";
import useTransaction from "./useTransaction";

export default function Transaction() {
  const { payments } = useTransaction();
  return (
    <>
      <div className="w-full p-4 bg-white mt-5 rounded-md drop-shadow-md">
        <label className="font-bold">Transaksi</label>
        <TablePayWaiting tableData={payments} />
      </div>
    </>
  );
}
