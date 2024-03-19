"use client";

import React from "react";
import TablePeserta from "../components/TablePeserta";
import useParticipant from "./useParticipant";

export default function Peserta() {
  const { participant } = useParticipant();
  return (
    <>
      <label className="font-bold">Data Peserta</label>
      <div className="w-full p-4 bg-white mt-5 rounded-md drop-shadow-md no-scrollbar overflow-x-scroll">
        <TablePeserta tableData={participant} />
      </div>
    </>
  );
}
