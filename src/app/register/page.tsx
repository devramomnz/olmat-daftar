"use client";

import Wave from "@/assets/wave";
import AppImage from "@/components/AppImage";
import Button from "@/components/button/Button";
import AntInput from "@/components/input/AntInput";
import AntItemSelect from "@/components/input/AntItemSelect";
import useRegister from "@/hooks/register/useRegister";
import { ROUTES } from "@/prefix/route.constant";
import olmatLogo from "@/../public/olmat-logo.png";
import { Form } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import AntPass from "@/components/input/AntPass";
import AntEmail from "@/components/input/AntEmail";

export default function RegisterAccount() {
  const { form } = useRegister();
  const [step, setStep] = useState<number>(0);
  return (
    <div className="relative overflow-hidden bg-brand/5 text-white">
      <Wave className="w-screen absolute opacity-10" />
      <div className="lg:grid lg:grid-cols-2">
        <div className="bg-brand-dark hidden lg:block min-h-screen">
          <div className="flex flex-col justify-center h-full mb-20 font-montserrat items-center">
            <AppImage
              src={olmatLogo}
              className="w-60 h-60 m-10"
              alt="olmat-logo"
            />
            <h1 className="text-3xl font-black">OLIMPIADE MATEMATIKA 2024</h1>
            <p>Daftar Sekarang !! Dan Jadilah yang TERBAIK</p>
          </div>
        </div>
        <div className="flex flex-col p-6 overflow-y-scroll w-full h-fit items-center">
          <Form
            form={form}
            className="text-lg flex flex-col max-w-[300px] mt-8 justify-center"
          >
            <div className="flex text-2xl mb-16 font-montserrat font-black text-brand-dark items-center">
              <h1>Pendaftaran Akun Olimpiade Matematika</h1>
            </div>
            <div className="flex gap-3 text-sm">
              <button
                onClick={() => {
                  setStep(0);
                }}
                className={`mb-4 border-b-2 ${
                  step === 0 && "border-brand-dark"
                } w-fit`}
              >
                Langkah 1
              </button>
              <button
                onClick={() => {
                  setStep(1);
                }}
                className={`mb-4 border-b-2 ${
                  step === 1 && "border-brand-dark"
                } w-fit`}
              >
                Langkah 2
              </button>
            </div>
            <div className={`${step !== 0 && "hidden"} grid`}>
              <h1 className="my-2">Pilih lokasi sekolah</h1>
              <AntItemSelect labelName="Provinsi" />
              <AntItemSelect labelName="Kota" />
              <AntItemSelect labelName="Kecamatan" />
              <AntItemSelect labelName="Nama Sekolah" />
              <Button
                onClick={() => {
                  setStep(1);
                }}
                className="py-2 text-brand-dark"
              >
                Lanjut
              </Button>
            </div>
            <div className={`${step !== 1 && "hidden"} grid`}>
              <h1 className="my-2">Konfirmasi data diri</h1>
              <AntInput labelName="Nama Lengkap" />
              <AntEmail labelName="Alamat Email" />
              <AntInput labelName="No WhatsApp" />
              <AntPass labelName="Buat kata sandi" />
              <AntPass labelName="Konfirmasi sata sandi" />
              <Button
                onClick={() => {
                  setStep(0);
                }}
                className="py-2 text-brand-dark"
              >
                Selesai
              </Button>
            </div>
            <div className="flex justify-center"></div>
            <p className="flex flex-col text-xs mt-10">
              Tidak dapat menemukan sekolah ?
              <span>
                <Link href={ROUTES.REG_SEKOLAH} className="font-semibold">
                  Yuk daftarkan sekolahmu
                </Link>
              </span>
            </p>
          </Form>
        </div>
      </div>
      <Wave className="w-screen -z-10 absolute bottom-0 rotate-180 opacity-5" />
    </div>
  );
}
