import { PaymentStatus } from "@/enum/payment.enum";
import { convertBirth } from "@/helper/common";
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
import React, { useEffect } from "react";
// import { TbCloudDownload } from "react-icons/tb";
// import jsPDF from "jspdf";
// import IdCard from "../peserta/IdCard";
import { useRouter } from "next/navigation";

interface IProps {
  tableData: IParticipant[];
}

export default function TablePeserta(props: IProps) {
  const { tableData } = props;
  const router = useRouter();
  // const idCardPdf = useRef<any>();
  // const [card, setCard] = useState<IParticipant>();
  // const [isStep, setIsStep] = useState(0);

  // function downloadPdfBtn(i: number) {
  //   setCard(tableData[i]);
  //   setIsStep(isStep + 1);
  // }

  // async function downloadPdf() {
  //   const element = idCardPdf.current;
  //   if (!element) {
  //     console.error("Element not found");
  //     return;
  //   }

  //   if (card) {
  //     const pdf = new jsPDF({
  //       orientation: "portrait",
  //       format: "b6",
  //       unit: "px",
  //     });

  //     pdf.html(element, {
  //       callback: () => {
  //         pdf.save(`Olmat-id-${card.name}.pdf`);
  //       },
  //       html2canvas: {
  //         scale: 1.183,
  //         width: 475,
  //         // height: 665,
  //       },
  //     });
  //   }
  // }

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

  // useEffect(() => {
  //   downloadPdf();
  //   router.push("/user/peserta");
  // }, [isStep]);

  useEffect(() => {
    router.push("/user/peserta");
  }, []);

  return (
    <div>
      <div className="h-0 absolute overflow-hidden">
        {/* <div ref={idCardPdf} className="h-fit">
          <IdCard card={card} />
        </div> */}
      </div>
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
          {/* <TableColumn align="center" scope="col">
            Kartu Peserta
          </TableColumn> */}
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
              {/* <TableCell data-label="Actions" className="text-xs">
                <button
                  // href={ROUTES.PESERTA + `/${data.id}`}
                  className="p-1 mb-2 mr-2 w-fit flex items-center gap-2 text-sm font-medium rounded-md text-center bg-brand  hover:text-white hover:bg-brand-semi duration-500  focus:outline-none focus:ring-red-300 "
                  onClick={() => downloadPdfBtn(i)}
                >
                  <TbCloudDownload />
                  Kartu Peserta
                </button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {tableData.length === 0 && (
        <h1 className="text-center text-sm text-gray-400 font-bold pb-5">
          Tidak ada data
        </h1>
      )}
    </div>
  );
}
