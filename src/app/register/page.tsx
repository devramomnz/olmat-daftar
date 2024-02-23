"use client";

import Wave from "@/assets/wave";
import AppImage from "@/components/AppImage";
import Button from "@/components/button/Button";
import AntInput from "@/components/input/AntInput";
import { ROUTES } from "@/prefix/route.constant";
import { Form } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import AntPass from "@/components/input/AntPass";
import AntEmail from "@/components/input/AntEmail";
import { appSetting } from "@/constants/appSetting";
import useRegister from "./useRegister";
import AntItemSelect from "@/components/input/AntItemSelect";

export default function RegisterAccount() {
  const { form, option, handleInputChange, handleSubmit, handleOptionSelect } =
    useRegister();
  const [step, setStep] = useState<number>(0);

  return (
    <div className="relative overflow-hidden bg-brand/5 text-white">
      <Wave className="w-screen absolute opacity-10" />
      <div className="lg:grid lg:grid-cols-2">
        <div className="bg-brand-dark hidden lg:block min-h-screen">
          <div className="flex flex-col justify-center h-full mb-20 font-montserrat items-center">
            <AppImage
              src={appSetting.logoEvent}
              className="w-60 h-60 m-10"
              alt="olmat-logo"
            />
            <h1 className="text-3xl font-black">{appSetting.eventName}</h1>
            <p>Daftar Sekarang !! Dan Jadilah yang TERBAIK</p>
          </div>
        </div>

        <div className="flex flex-col p-6 overflow-y-scroll w-full h-fit items-center">
          <div className="text-lg flex flex-col max-w-[300px] mt-8 justify-center">
            <div className="flex text-2xl mb-16 font-montserrat font-black text-brand-dark items-center">
              <h1>Pendaftaran Akun {appSetting.eventName}</h1>
            </div>
            <div className="flex text-brand-dark gap-3 text-sm">
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
            <Form form={form} onFinish={handleSubmit}>
              <div className={`${step !== 0 && "hidden"} grid`}>
                <h1 className="my-2">Pilih lokasi sekolah</h1>
                <AntItemSelect
                  onChange={(e) => handleOptionSelect("province", e)}
                  option={option.province}
                  labelName="Provinsi"
                  name="province"
                />
                <AntItemSelect
                  onChange={(e) => handleOptionSelect("city", e)}
                  option={option.city}
                  labelName="Kota"
                  name="city"
                />
                <AntItemSelect
                  onChange={(e) => handleOptionSelect("subdistrict", e)}
                  option={option.subdistrict}
                  labelName="Kecamatan"
                  name="subdistrict"
                />
                <AntItemSelect
                  onChange={(e) => handleOptionSelect("school", e)}
                  option={option.school}
                  labelName="Nama Sekolah"
                  name="school"
                />
                <div className="w-full flex justify-center">
                  <span
                    onClick={() => {
                      setStep(1);
                    }}
                    className="px-6 py-[0.30rem] bg-brand rounded-lg text-sm font-semibold hover:shadow-lg"
                  >
                    Lanjut
                  </span>
                </div>
              </div>
              <div className={`${step !== 1 && "hidden"} grid`}>
                <h1 className="my-2">Konfirmasi data diri</h1>
                <AntInput
                  labelName="Nama Lengkap"
                  onChange={(e) => handleInputChange(e)}
                  name="name"
                />
                <AntEmail
                  onChange={(e) => handleInputChange(e)}
                  name="email"
                  labelName="Alamat Email"
                />
                <AntInput
                  onChange={(e) => handleInputChange(e)}
                  name="phone"
                  labelName="No WhatsApp"
                />
                <AntPass
                  onChange={(e) => handleInputChange(e)}
                  name="password"
                  labelName="Buat kata sandi"
                />
                <AntPass
                  form={form}
                  onChange={(e) => handleInputChange(e)}
                  dependencies={["password"]}
                  name="password2"
                  labelName="Konfirmasi kata sandi"
                />
                <Button onClick={() => {}} className="py-2 text-brand-dark">
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
      </div>
      <Wave className="w-screen -z-10 absolute bottom-0 rotate-180 opacity-5" />
    </div>
  );
}
