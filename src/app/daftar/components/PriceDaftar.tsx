import { convertRupiah } from "@/helper/common";
import { IParticipant } from "@/interfaces/IParticipant";
import React, { useEffect, useState } from "react";

interface IProps {
  payload: IParticipant[];
  price: number;
  freeInterval: number;
  handlePay: () => void;
  defaultValue: IParticipant;
}

export default function PriceDaftar(props: IProps) {
  const { payload, defaultValue, price, freeInterval, handlePay } = props;
  const [free, setFree] = useState<number>(0);

  const disabled =
    payload[0].attachment === defaultValue.attachment ||
    payload[0].img === defaultValue.img;

  useEffect(() => {
    if (
      payload.length > freeInterval &&
      payload.length % (freeInterval + 1) === 0
    ) {
      setFree(payload.length / (freeInterval + 1));
    }
  }, [payload]);

  return (
    <div className="bg-white h-fit flex flex-col rounded-lg drop-shadow-md">
      <h1 className="font-bold rounded-t-lg bg-brand-dark text-white py-1 px-2 w-full">
        Biaya Pendaftaran
      </h1>
      <div className="text-sm px-5 py-3 flex flex-col gap-2">
        <div className="flex justify-between items-end">
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
        <button
          disabled={disabled ? true : false}
          onClick={() => handlePay()}
          className={`${
            disabled && "opacity-20 duration-500"
          } px-9 py-1 rounded-full bg-brand-dark duration-500 text-white font-black`}
        >
          Bayar
        </button>
      </div>
    </div>
  );
}
