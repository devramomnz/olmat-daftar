"use client";

import React from "react";
import TablePayWaiting from "../components/TablePayWaiting";
import useTransaction from "./useTransaction";
import PagintaionV1 from "@/components/pagination/PaginationV1";

export default function Transaction() {
  const {
    payments,
    metaData,
    paginationOptions,
    handleChangeCurentPage,
    handleChangePageSize,
  } = useTransaction();
  return (
    <>
      <label className="font-bold">Transaksi</label>
      <div className="w-full p-4 bg-white mt-5 rounded-md drop-shadow-md">
        <div className="bg-white p-1 flex flex-col gap-2 rounded-md">
          <div className="overflow-x-scroll no-scrollbar">
            <TablePayWaiting tableData={payments} />
          </div>
          <PagintaionV1
            curentPage={paginationOptions.curentPage}
            metaData={metaData}
            handleCurentPage={handleChangeCurentPage}
            handlePageSize={handleChangePageSize}
          />
        </div>
      </div>
    </>
  );
}
