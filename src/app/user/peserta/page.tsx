"use client";

import React from "react";
import TablePeserta from "../components/TablePeserta";
import useParticipant from "./useParticipant";
import PagintaionV1 from "@/components/pagination/PaginationV1";

export default function Peserta() {
  const {
    participant,
    paginationOptions,
    metaData,
    handleChangeCurentPage,
    handleChangePageSize,
  } = useParticipant();
  return (
    <>
      <label className="font-bold">Data Peserta</label>
      <div className="w-full p-2 bg-white mt-5 rounded-md drop-shadow-md ">
        <div className="no-scrollbar overflow-x-scroll">
          <TablePeserta tableData={participant} />
        </div>
        <PagintaionV1
          curentPage={paginationOptions.curentPage}
          metaData={metaData}
          handleCurentPage={handleChangeCurentPage}
          handlePageSize={handleChangePageSize}
        />
      </div>
    </>
  );
}
