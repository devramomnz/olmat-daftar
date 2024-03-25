import { PaymentStatus } from "@/enum/payment.enum";
import { IParticipant } from "@/interfaces/IParticipant";
import {
  Chip,
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
      return "success";
    } else if (data === PaymentStatus.PENDING) {
      return "warning";
    } else if (data === PaymentStatus.EXPIRED) {
      return "danger";
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
              <Chip
                variant="solid"
                size="sm"
                color={statusColor(data.status)}
                className={`${statusColor(
                  data.status
                )} px-3 rounded-full font-black w-fit`}
              >
                <p className="font-black text-xs">{data.status}</p>
              </Chip>
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
