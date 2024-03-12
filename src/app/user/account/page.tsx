"use client";

import AntEmail from "@/components/input/AntEmail";
import AntInput from "@/components/input/AntInput";
import AntPass from "@/components/input/AntPass";
import { useAdminProfile } from "@/hooks/zustand/useAdminProfile";
import Link from "next/link";
import React from "react";

export default function Account() {
  const { name, email, phone } = useAdminProfile();

  return (
    <>
      <label className="font-bold">Pengaturan Akun</label>
      <div className="w-full p-4 bg-white mt-5 rounded-md drop-shadow-md flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-5">
          <AntInput defaultValue={name} labelName="Nama" name="name" />
          <AntInput defaultValue={phone} labelName="No. Telepon" name="tlp" />
          <AntEmail defaultValue={email} labelName="Email" name="email" />
          <AntPass labelName="Password" name="password" />
        </div>
        <Link
          href={""}
          className="py-1 rounded-lg w-fit px-5 font-bold text-white hover:bg-brand hover:text-black bg-brand-semi duration-500"
        >
          Edit Akun
        </Link>
      </div>
    </>
  );
}
