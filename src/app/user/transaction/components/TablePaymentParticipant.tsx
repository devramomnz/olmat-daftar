import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { PiStudent } from "react-icons/pi";

export default function TablePaymentParticipant() {
  return (
    <>
      <div className="flex justify-center">
        <label
          className="flex gap-3 font-bold text-xl
         items-center"
        >
          <PiStudent className="text-xl" /> Peserta Terdaftar
        </label>
      </div>
      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
      >
        <TableHeader>
          <TableColumn
            align="center"
            scope="col"
            className="w-[40px] text-center"
          >
            No.
          </TableColumn>
          <TableColumn
            align="start"
            scope="col"
            className="text-center bg-gray-50"
          >
            Nama
          </TableColumn>
          <TableColumn align="center" scope="col" className="w-36 text-center">
            Tanggal Lahir
          </TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell data-label="No">{1}</TableCell>
            <TableCell data-label="name" className="text-start">
              {"Nama Peserta 1"}
            </TableCell>
            <TableCell data-label="birth">{1}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
