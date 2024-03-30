"use client";

import React from "react";
import TablePayWaiting from "../components/TablePayWaiting";
import useTransaction from "./useTransaction";

export default function Transaction() {
  const { payments } = useTransaction();
  return (
    <>
      <label className="font-bold">Dashboard</label>
      <div className="w-full p-4 bg-white mt-5 rounded-md drop-shadow-md">
        <TablePayWaiting tableData={payments} />
      </div>
    </>
  );
}
