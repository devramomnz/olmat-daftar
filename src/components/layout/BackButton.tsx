import { useRouter } from "next/navigation";
import React from "react";
import { IoArrowBackCircle } from "react-icons/io5";

export default function BackButton() {
  const router = useRouter();
  return (
    <>
      <IoArrowBackCircle
        className="text-2xl text-slate-700"
        onClick={() => router.back()}
      />
    </>
  );
}
