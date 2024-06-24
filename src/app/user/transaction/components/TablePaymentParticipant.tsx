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
      <Table
        className="w-full"
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
