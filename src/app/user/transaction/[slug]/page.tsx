"use client";

import React from "react";
import usePayment from "./usePayment";
import TablePaymentParticipant from "../components/TablePaymentParticipant";
import PaymentDetail from "../components/PaymentDetail";

export default function Payment() {
  const { paymentData } = usePayment();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 gap-y-3">
      <div className="bg-white p-4 text-center flex flex-col justify-center w-full gap-3 rounded-xl drop-shadow-md ">
        <PaymentDetail paymentData={paymentData} />
      </div>
      <div className="bg-white py-4 col-span-2 text-center flex flex-col w-full px-4 rounded-xl drop-shadow-md ">
        <TablePaymentParticipant tableData={paymentData.participants} />
      </div>
    </div>
  );
}
