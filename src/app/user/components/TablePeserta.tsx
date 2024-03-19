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

// interface IDataPeserta {
//   // id: number;
//   nama_peserta: string;
//   jenis_kelamin: string;
//   no_tlp: number;
//   jenjang: string;
//   status: number;
//   kartu_peserta: string;
// }

interface IProps {
  tableData: any;
}

export default function TablePeserta(props: IProps) {
  const { tableData } = props;
  // const [page, setPage] = React.useState(1);
  // const rowsPerPage = 4;

  // const pages = Math.ceil(dataPeserta.length / rowsPerPage);

  // const items = React.useMemo(() => {
  //   const start = (page - 1) * rowsPerPage;
  //   const end = start + rowsPerPage;

  //   return dataPeserta.slice(start, end);
  // }, [page, dataPeserta]);

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
          No Tlp
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
            <TableCell className="text-start" data-label="nama_peserta">
              {data.nama_peserta}
            </TableCell>
            <TableCell data-label="jenis_kelamin">
              {data.jenis_kelamin}
            </TableCell>
            <TableCell data-label="no_tlp">{data.no_tlp}</TableCell>
            <TableCell data-label="jenjang">{data.jenjang}</TableCell>
            <TableCell data-label="status">{data.status}</TableCell>
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
