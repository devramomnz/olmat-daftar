"use client";

import { useParticipantPay } from "@/hooks/zustand/useParticipantPay";
import React from "react";

export default function Payment() {
  const { participantDataPay } = useParticipantPay();
  console.log(participantDataPay);
  return (
    <div className="grid">
      <div></div>
    </div>
  );
}
