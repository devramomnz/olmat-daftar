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
import React, { useEffect, useState } from "react";
import { TbCloudDownload } from "react-icons/tb";
import Image from "next/image";
import html2canvas from "html2canvas";

interface IProps {
  tableData: IParticipant[];
}

export default function TablePeserta(props: IProps) {
  const { tableData } = props;
  const [card, setCard] = useState<IParticipant>();
  const [isStep, setIsStep] = useState(0);

  function downloadPdfBtn(i: number) {
    setCard(tableData[i]);
    setIsStep(isStep + 1);
  }
  async function printDocument() {
    if (card) {
      const input = document.getElementById("idCardElement");
      if (input) {
        html2canvas(input, { scale: 4 }).then((canvas) => {
          canvas.toBlob((blob) => {
            if (blob) {
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = `ID-Card-${card?.name}-OLMAT 2024.png`;
              link.click();
            } else {
              console.error("Blob creation failed");
            }
          }, "image/png");
        });
        setIsStep(0);
      } else {
        console.error("Element not found");
      }
    }
  }

  // async function printDocument() {
  //   if (card) {
  //     const input = document.getElementById("idCardElement");
  //     if (input) {
  //       html2canvas(input, { scale: 4 }).then((canvas) => {
  //         const imgData = canvas.toDataURL("image/png");

  //         const pdf = new jsPDF({
  //           orientation: "portrait",
  //           unit: "mm",
  //           format: [105, 148], // size in mm (width, height)
  //         });
  //         const imgWidth = 105; // width in mm
  //         const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //         pdf.addImage(
  //           imgData,
  //           "JPEG",
  //           0,
  //           0,
  //           imgWidth,
  //           imgHeight,
  //           undefined,
  //           "FAST"
  //         );
  //         pdf.save(`ID-Card-${card?.name}-OLMAT 2024.pdf`);
  //       });
  //       setIsStep(0);
  //     } else {
  //       console.error("Element not found");
  //     }
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

  useEffect(() => {
    if (isStep !== 0) {
      setTimeout(() => {
        printDocument();
      }, 2000);
    }
  }, [isStep]);

  // aspect-[472/665]
  return (
    <>
      <div className="absolute w-0 h-0 overflow-hidden">
        <div className="">
          <div
            className=" relative sm:w-56 max-w-56  h-full rounded-md border-1 overflow-hidden aspect-[105/148]"
            id="idCardElement"
          >
            {/* <div className="rounded-md border-1 text-[8px] w-56 font-bold overflow-hidden font-montserrat object-center object-cover h-full aspect-[105/148] flex"> */}
            <div className=" text-[8px] font-bold font-montserrat flex">
              <Image
                src={"/idcard.png"}
                alt="idCard Olmat"
                // height={100}
                // width={100}
                fill
                // className="object-fill"
              />
              <h2 className="absolute top-[157px] left-[45px]">{card?.name}</h2>
              <h2 className="absolute top-[193px] left-[45px]">{card?.id}</h2>
              <h2 className="absolute top-[232px] text-[6px] left-[45px]">
                {card?.school_name}
              </h2>
              <h2 className="absolute top-[264px] left-[45px]">
                {card?.region}
              </h2>
              {/* </div> */}
              <div className="absolute w-full top-[67px] z-50 flex items-center justify-center">
                <div className="relative aspect-[48/71] flex items-center justify-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMG_CDN}/imgs/${card?.img}`}
                    alt="idCard"
                    width={50}
                    height={300}
                    // fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button
        className="p-1 mb-2 mr-2 w-fit flex items-center gap-2 text-sm font-medium rounded-md text-center bg-brand  hover:text-white hover:bg-brand-semi duration-500  focus:outline-none focus:ring-red-300 "
        onClick={() => printDocument()}
      >
        <TbCloudDownload />
        Kartu Peserta
      </button> */}

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
          <TableColumn align="center" className="text-center" scope="col">
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

              <TableCell data-label="Actions" className="text-xs text-center">
                <div className="flex justify-center">
                  {data.status === "active" ? (
                    <button
                      className="p-1 mb-2 mr-2 w-fit flex items-center gap-2 text-sm font-medium rounded-md text-center bg-brand  hover:text-white hover:bg-brand-semi duration-500  focus:outline-none focus:ring-red-300 "
                      onClick={() => downloadPdfBtn(i)}
                    >
                      <TbCloudDownload />
                      Kartu Peserta
                    </button>
                  ) : (
                    <p className="text-xs">
                      Pembayaran Belum Tuntas {data.status}
                    </p>
                  )}
                </div>
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
