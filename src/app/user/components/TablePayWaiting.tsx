import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

// interface DataType {
//   id: number;
//   waktu_pendaftaran: string;
//   batas_waktu: string;
//   jumlah_peserta: number;
//   total_pembayaran: number;
//   status: string;
// }

const data = [
  {
    id: 0,
    waktu_pendaftaran: "John",
    batas_waktu: "Brown",
    jumlah_peserta: 32,
    total_pembayaran: 200000,
    status: "sukses",
  },
  {
    id: 1,
    waktu_pendaftaran: "John",
    batas_waktu: "Brown",
    jumlah_peserta: 32,
    total_pembayaran: 200000,
    status: "sukses",
  },
  {
    id: 2,
    waktu_pendaftaran: "John",
    batas_waktu: "Brown",
    jumlah_peserta: 32,
    total_pembayaran: 200000,
    status: "sukses",
  },
  {
    id: 3,
    waktu_pendaftaran: "John",
    batas_waktu: "Brown",
    jumlah_peserta: 32,
    total_pembayaran: 200000,
    status: "sukses",
  },
];

const TablePayWaiting: React.FC = () => (
  <>
    <label>Menunggu Pembayaran</label>
    <div className="overflow-x-scroll no-scrollbar">
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
            Waktu Pendaftaran
          </TableColumn>
          <TableColumn align="center" className="" scope="col">
            Jumlah Peserta
          </TableColumn>
          <TableColumn align="center" scope="col">
            Total Pembayaran
          </TableColumn>
          <TableColumn align="center" scope="col">
            Status
          </TableColumn>
        </TableHeader>
        <TableBody className="">
          {data?.map((data, i) => (
            <TableRow key={i}>
              <TableCell data-label="No">{i + 1}</TableCell>
              <TableCell data-label="jenis_kelamin">
                {data.waktu_pendaftaran}
              </TableCell>
              <TableCell data-label="no_tlp">{data.jumlah_peserta}</TableCell>
              <TableCell data-label="jenjang">
                {data.total_pembayaran}
              </TableCell>
              <TableCell data-label="status">{data.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </>
);

export default TablePayWaiting;
