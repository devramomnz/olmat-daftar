"use client";

import React from "react";
import usePayment from "./usePayment";
import TablePaymentParticipant from "../components/TablePaymentParticipant";
import PaymentDetail from "../components/PaymentDetail";
import { PiStudent } from "react-icons/pi";
import { Modal } from "antd";
import { Button } from "@nextui-org/react";

export default function Payment() {
  const { paymentData, payStatus, isModal, setIsModal, handleGetNewPayments } =
    usePayment();

  return (
    <>
      <Modal
        title="Konfirmasi"
        open={isModal}
        onCancel={() => setIsModal(false)}
        className="text-black"
        footer=""
      >
        <p>Apakah anda ingin mengajukan ulang pembayaran ?</p>
        <div className="flex justify-end gap-4 text-white">
          <Button
            onClick={handleGetNewPayments}
            className="bg-brand/20 text-sm font-bold"
            size="sm"
          >
            Ya
          </Button>
          <Button
            onClick={() => setIsModal(false)}
            className="bg-brand-dark text-sm text-white font-bold"
            size="sm"
          >
            Tidak
          </Button>
        </div>
      </Modal>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 gap-y-3">
        <div className="bg-white p-4 text-center flex flex-col justify-center w-full gap-3 rounded-xl drop-shadow-md ">
          <PaymentDetail
            paymentData={paymentData}
            payStatus={payStatus}
            handleGetNewPayment={() => setIsModal(true)}
          />
        </div>
        <div className="bg-white py-4 col-span-2 text-center flex flex-col w-full px-4 rounded-xl drop-shadow-md ">
          <div className="flex pb-3 justify-center">
            <label
              className="flex gap-3 font-bold text-xl
         items-center"
            >
              <PiStudent className="text-xl" />
              Daftar Peserta
            </label>
          </div>
          <div className="w-full overflow-x-scroll no-scrollbar">
            <TablePaymentParticipant tableData={paymentData.participants} />
          </div>
        </div>
      </div>
    </>
  );
}
