import { convertBirth } from "@/helper/common";
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

interface IParticipant {
  name: string;
  gender: string;
  birth: string;
}
interface IProps {
  tableData: IParticipant[];
}

export default function TablePaymentParticipant(props: IProps) {
  const { tableData } = props;
  function genderLabel(data: string) {
    if (data === "L") {
      return "Laki-Laki";
    } else if (data === "P") {
      return "Perempuan";
    }
  }
  return (
    <>
      <div className="flex pb-3 justify-center">
        <label
          className="flex gap-3 font-bold text-xl
         items-center"
        >
          <PiStudent className="text-xl" />
          Daftar Peserta
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
          <TableColumn align="start" scope="col" className="text-center ">
            Nama
          </TableColumn>
          <TableColumn align="center" scope="col" className="w-36 text-center">
            Gender
          </TableColumn>
          <TableColumn align="center" scope="col" className="w-36 text-center">
            Tanggal Lahir
          </TableColumn>
        </TableHeader>
        <TableBody>
          {tableData.map((data, i) => (
            <TableRow key={i}>
              <TableCell data-label="No">{i + 1}</TableCell>
              <TableCell data-label="name" className="text-start">
                {data.name}
              </TableCell>
              <TableCell data-label="gender">
                {genderLabel(data.gender)}
              </TableCell>
              <TableCell data-label="birth">
                {convertBirth(data.birth)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
