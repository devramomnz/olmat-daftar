import { PaymentStatus } from "@/enum/payment.enum";
import { IParticipant } from "@/interfaces/IParticipant";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { TbCloudDownload } from "react-icons/tb";

interface IProps {
  tableData: IParticipant[];
}

export default function TablePeserta(props: IProps) {
  const { tableData } = props;

  function statusColor(data: string) {
    if (data === PaymentStatus.PAID) {
      return "bg-green-500/70";
    } else if (data === PaymentStatus.PENDING) {
      return "bg-yellow-500/70";
    } else if (data === PaymentStatus.EXPIRED) {
      return "bg-red-500/70";
    }
  }

  return (
    <Table
      aria-label="Peserta Terdaftar"
      isStriped
      className=" text-nowrap w-full min-w-[700px] rounded-lg overflow-hidden p-3"
    >
      <TableHeader className="bg-brand-dark h-10 text-white text-center">
        <TableColumn align="center" scope="col" className="w-[80px]">
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
        <TableColumn align="center" scope="col">
          Jenjang
        </TableColumn>
        <TableColumn align="center" scope="col">
          Status
        </TableColumn>
        <TableColumn align="center" scope="col">
          Kartu Peserta
        </TableColumn>
      </TableHeader>
      <TableBody className="">
        {tableData?.map((data: any, i: number) => (
          <TableRow key={i}>
            <TableCell data-label="No">{i + 1}</TableCell>
            <TableCell className="text-start" data-label="name">
              {data.name}
            </TableCell>
            <TableCell data-label="gender">{data.gender}</TableCell>
            <TableCell data-label="birth">{data.birth}</TableCell>
            <TableCell data-label="email">{data.jenjang}</TableCell>
            <TableCell data-label="status">
              <h2
                className={`${statusColor(
                  data.status
                )} px-3 rounded-full font-bold w-fit`}
              >
                {data.status}
              </h2>
            </TableCell>
            <TableCell
              data-label="Actions"
              // className="flex items-center justify-center"
            >
              <button
                onClick={() => console.log(data.kartu_peserta)}
                type="button"
                className="p-1 mb-2 mr-2 flex items-center gap-2 text-sm font-medium rounded-md text-center bg-brand  hover:text-white hover:bg-brand-semi duration-500  focus:outline-none focus:ring-red-300 "
              >
                <TbCloudDownload />
                Download
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
