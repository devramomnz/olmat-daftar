import { PaymentStatus } from "@/enum/payment.enum";
import { convertBirth } from "@/helper/common";
import { IParticipant } from "@/interfaces/IParticipant";
import { ROUTES } from "@/prefix/routes";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { TbCloudDownload } from "react-icons/tb";

interface IProps {
  tableData: IParticipant[];
}

export default function TablePeserta(props: IProps) {
  const { tableData } = props;

  function statusColor(data: string) {
    if (data === "active") {
      return "success";
    } else if (data === PaymentStatus.PENDING) {
      return "warning";
    } else if (data === PaymentStatus.EXPIRED) {
      return "danger";
    }
  }

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
        aria-label="Peserta Terdaftar"
        isStriped
        removeWrapper
        isCompact
        className=" text-nowrap w-full min-w-[700px] rounded-lg p-3"
      >
        <TableHeader className="bg-brand-dark h-10 text-white text-center">
          <TableColumn align="center" scope="col" className="w-[10px]">
            No.
          </TableColumn>
          <TableColumn align="center" scope="col">
            Nama Peserta
          </TableColumn>
          <TableColumn align="center" className="" scope="col">
            Jenis Kelamin
          </TableColumn>
          <TableColumn align="center" scope="col">
            Tanggal Lahir
          </TableColumn>
          <TableColumn className="text-center" align="center" scope="col">
            Status
          </TableColumn>
          <TableColumn align="center" scope="col">
            Kartu Peserta
          </TableColumn>
        </TableHeader>
        <TableBody className="">
          {tableData?.map((data: any, i: number) => (
            <TableRow key={i} className="">
              <TableCell className="text-xs" data-label="No">
                {i + 1}
              </TableCell>
              <TableCell className="text-xs text-start" data-label="name">
                {data.name}
              </TableCell>
              <TableCell className="text-xs" data-label="gender">
                {genderLabel(data.gender)}
              </TableCell>
              <TableCell className="text-xs" data-label="birth">
                {convertBirth(data.birth)}
              </TableCell>
              <TableCell
                className="text-xs flex justify-center"
                data-label="status"
              >
                <Chip
                  variant="flat"
                  size="sm"
                  color={statusColor(data.status)}
                  className={`${statusColor(
                    data.status
                  )} px-3 rounded-full font-black w-fit`}
                >
                  <p className="font-black text-xs">{data.status}</p>
                </Chip>
              </TableCell>
              <TableCell data-label="Actions" className="text-xs">
                <Link
                  href={ROUTES.PESERTA + `/${data.id}`}
                  className="p-1 mb-2 mr-2 w-fit flex items-center gap-2 text-sm font-medium rounded-md text-center bg-brand  hover:text-white hover:bg-brand-semi duration-500  focus:outline-none focus:ring-red-300 "
                >
                  <TbCloudDownload />
                  Kartu Peserta
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {tableData.length === 0 && (
        <h1 className="text-center text-sm text-gray-400 font-bold pb-5">
          Tidak ada data
        </h1>
      )}
    </>
  );
}
