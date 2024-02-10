import Link from "next/link";
import React from "react";

export default function Account() {
  return (
    <>
      <label className="font-bold">Pengaturan Akun</label>
      <div className="w-full p-4 bg-white mt-5 rounded-md drop-shadow-md flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <h2 className=" wfull ">nama</h2>
          <h2 className=" wfull ">: user</h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <h2 className=" wfull ">Email</h2>
          <h2 className=" wfull ">: user</h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <h2 className=" wfull ">No. Telepon</h2>
          <h2 className=" wfull ">: user</h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <h2 className=" wfull ">Kata Sandi</h2>
          <Link
            href={""}
            className="py-1 rounded-lg w-fit px-5 font-bold text-white hover:bg-brand hover:text-black bg-brand-semi duration-500"
          >
            Ubah Sandi
          </Link>
        </div>
      </div>
    </>
  );
}
