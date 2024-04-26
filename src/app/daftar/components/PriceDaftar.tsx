import Button from "@/components/button/Button";
import AntItemSelect from "@/components/input/AntItemSelect";
import { convertRupiah } from "@/helper/common";
import { IParticipant } from "@/interfaces/IParticipant";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IOptionsReg } from "../useDaftar";

interface IProps {
  type: any;
  payload: IParticipant[];
  option: IOptionsReg;
  schoolName?: string;
  schoolId?: number;
  price: number;
  amount: number;
  freeInterval: number;
  isModalAdmin: any;
  handleChangeSelect: (name: string, e: any) => void;
  setIsModalAdmin: React.Dispatch<any>;
  handlePay: () => void;
  handleSchoolBtn: () => void;
}

export default function PriceDaftar(props: IProps) {
  const {
    type,
    payload,
    price,
    amount,
    option,
    freeInterval,
    schoolName,
    schoolId,
    isModalAdmin,
    handleChangeSelect,
    setIsModalAdmin,
    handlePay,
    handleSchoolBtn,
  } = props;
  const [free, setFree] = useState<number>(0);

  useEffect(() => {
    if (
      payload.length > amount &&
      payload.length % (amount + freeInterval) === 0
    ) {
      setFree(payload.length / (amount + freeInterval));
      // setFree(freeInterval);
    }
  }, [payload]);

  return (
    <>
      <Modal
        title="Pilih Sekolah"
        open={isModalAdmin}
        onCancel={() => setIsModalAdmin(false)}
        className="text-black"
        footer=""
      >
        <AntItemSelect
          labelName="Kota"
          onChange={(e: any) => handleChangeSelect("city", e)}
          option={option.city}
        />
        <AntItemSelect
          labelName="Kecamatan"
          onChange={(e: any) => {
            handleChangeSelect("subdistrict", e);
          }}
          option={option.subdistrict}
        />
        <AntItemSelect
          labelName="Sekolah"
          onChange={(e: any) => {
            handleChangeSelect("school", e);
          }}
          option={option.school}
        />
      </Modal>
      <div className="bg-white h-fit flex flex-col rounded-lg drop-shadow-md">
        <h1 className="font-bold rounded-t-lg bg-brand-dark text-white py-1 px-2 w-full">
          Biaya Pendaftaran
        </h1>
        <div className="text-sm px-5 py-3 flex flex-col gap-2">
          {type === "Admin" && (
            <div className="flex flex-col w-full border-b">
              <div className="flex justify-between">
                <h2>Sekolah :</h2>
                <button
                  onClick={() => handleSchoolBtn()}
                  className="flex items-center gap-1 "
                >
                  <p>Pilih Sekolah</p>
                  <FaRegEdit />
                </button>
              </div>
              <h2 className="font-bold">{schoolName}</h2>
            </div>
          )}
          <div className="flex justify-between  items-end">
            <h2>biaya Pendaftaran :</h2>
            <h2>{convertRupiah(price)}</h2>
          </div>
          <div className="flex justify-between items-end">
            <h2>Jumlah Peserta :</h2>
            <h2>{payload?.length}</h2>
          </div>
          <div className="flex justify-between items-end">
            <h2>Peserta gratis :</h2>
            <h2>{free}</h2>
          </div>
          <div className="border-t pt-2 font-bold flex justify-between items-end">
            <h2>Total Biaya</h2>
            <h2>{convertRupiah((payload.length - free) * price)}</h2>
          </div>
        </div>
        <div className="flex  justify-center m-4">
          {schoolId && (
            <Button
              // type="submit"
              onClick={handlePay}
              className={`px-9 py-1 rounded-full bg-brand duration-500 text-white font-black`}
            >
              Bayar
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
