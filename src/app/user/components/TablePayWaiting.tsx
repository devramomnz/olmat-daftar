import React from "react";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { IPayment } from "@/interfaces/IPayments";
import { convertRupiah } from "@/helper/common";
import Link from "next/link";
import { ROUTES } from "@/prefix/routes";
import { encryptString } from "@/utils/encrypt";
import { PaymentStatus } from "@/enum/payment.enum";

interface IProps {
  tableData: IPayment[];
}

export default function TablePayWaiting(props: IProps) {
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
    <>
      <Table
        aria-label="Peserta Terdaftar"
        isStriped
        isCompact
        removeWrapper
        className=" text-nowrap w-full min-w-[700px] rounded-lg "
      >
        <TableHeader className="bg-brand-dark h-10 text-white text-center">
          <TableColumn align="center" scope="col" className="w-[80px]">
            No.
          </TableColumn>
          <TableColumn align="center" scope="col">
            No. Invoice
          </TableColumn>
          <TableColumn align="center" className="text-center" scope="col">
            Metode
          </TableColumn>
          <TableColumn align="center" className="text-center" scope="col">
            Jumlah Peserta
          </TableColumn>
          <TableColumn align="center" className="text-center" scope="col">
            Harga
          </TableColumn>
          <TableColumn align="center" className="text-center" scope="col">
            Total Harga
          </TableColumn>
          <TableColumn align="center" className="text-center" scope="col">
            Status
          </TableColumn>
          <TableColumn align="center" className="text-center" scope="col">
            Aksi
          </TableColumn>
        </TableHeader>
        <TableBody className="">
          {tableData?.map((data, i) => (
            <TableRow key={i} className="h-10">
              <TableCell data-label="No">{i + 1}</TableCell>
              <TableCell data-label="invoice">{data.invoice}</TableCell>
              <TableCell data-label="code">
                <p className="text-center">{data.code}</p>
              </TableCell>
              <TableCell className="text-center" data-label="participantAmount">
                <p className="text-center">{data.participantAmount}</p>
              </TableCell>
              <TableCell data-label="amount">
                <p className="text-center">{convertRupiah(data.amount)}</p>
              </TableCell>
              <TableCell data-label="totalAmount">
                <p className="text-center">{convertRupiah(data.totalAmount)}</p>
              </TableCell>
              <TableCell data-label="status">
                <div className="flex justify-center items-center">
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
                </div>
              </TableCell>
              <TableCell data-label="participantAmount">
                <div className="flex justify-center items-center">
                  <Link
                    href={
                      ROUTES.TRANSACTION + "/" + encryptString(`${data.id}`)
                    }
                    className="px-2 hover:bg-brand-semi duration-300 bg-brand-dark font-bold text-white rounded-lg py-1"
                  >
                    Detail
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {tableData.length < 1 && (
        <h1 className="text-center text-sm text-gray-400 font-bold pb-5">
          Tidak ada data
        </h1>
      )}
    </>
  );
}
