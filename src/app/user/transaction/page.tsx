"use client";

import React from "react";
import TablePayWaiting from "../components/TablePayWaiting";

export default function Transaction() {
  return (
    <>
      <label className="font-bold">Dashboard</label>
      <div className="w-full p-4 bg-white mt-5 rounded-md drop-shadow-md">
        <TablePayWaiting />
      </div>
    </>
  );
}
