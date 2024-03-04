"use client";

import React from "react";
import Button from "@/components/button/Button";

export default function Payment() {
  // const [show, setShow] = useState(false);

  // const { participantDataPay } = useParticipantPay();
  // console.log(participantDataPay);
  return (
    <div className="bg-white py-8 text-center flex flex-col justify-center w-full md:w-2/5 lg:w-3/12 px-4 rounded-xl drop-shadow-md ">
      <h2 className="font-bold">Kode OTP telah dikirim</h2>
      <div className="flex flex-col gap-3">
        <h2>Masukkan kode OTP</h2>
        <form action="">
          <div className="relativ flex justify-center h-10"></div>
          <div className="w-full flex justify-center">
            <Button className="mt-8 w-52">Submit</Button>
          </div>
        </form>
        <div></div>
      </div>
    </div>
  );
}
