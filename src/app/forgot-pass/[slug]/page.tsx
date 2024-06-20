"use client";

import Wave from "@/assets/wave";
import AppImage from "@/components/AppImage";
import { appSetting } from "@/constants/appSetting";
import Lottie from "lottie-react";
import React from "react";
import passLock from "@/assets/lottie/passLock.json";
import Button from "@/components/button/Button";
import { Form } from "antd";
import Link from "next/link";
import useUpdatePass from "./useUpdatePass";
import AntPass from "@/components/input/AntPass";

export default function ForgotPassword() {
  const { form, handleChangeInput, handleSubmit } = useUpdatePass();
  return (
    <div className="relative overflow-hidden bg-brand-semi text-white">
      <Wave
        className="w-screen min-h-screen absolute z-0 opacity-10"
        fill="white"
      />
      <div className="lg:grid lg:grid-cols-2">
        <div className=" hidden lg:block min-h-screen">
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
        <div className="min-h-screen flex justify-center items-center z-10">
          <div className="flex flex-col py-10 font-montserrat p-4 z-10 bg-white h-3/4 md:p-10 md:h-fit w-full mx-5 md:w-1/2 rounded-xl">
            <div className="flex flex-col items-center text-2xl font-black  w-full gap-5 text-brand-dark ">
              <Lottie animationData={passLock} autoPlay loop className="h-52" />
              <h1 className="text-center w-full">Reset Password</h1>
            </div>
            <div className="grid md:max-w-1/2">
              <Form
                form={form}
                onFinish={handleSubmit}
                className="mt-5 flex flex-col gap-1"
              >
                <AntPass
                  // onChange={handleChangeInput}
                  name="password"
                  labelName="Buat kata sandi baru"
                />
                <AntPass
                  form={form}
                  onChange={handleChangeInput}
                  dependencies={["password"]}
                  name="newPassword"
                  labelName="Konfirmasi kata sandi baru"
                />
                {/* <AntEmail
                  name="email"
                  onChange={handleChange}
                  placeholder="Masukkan email"
                  className="text-center"
                /> */}
                <Button className="w-full text-xl">Simpan</Button>
              </Form>
            </div>
            <div className="grid place-items-center mt-10">
              <Link
                href={
                  "https://api.whatsapp.com/send/?phone=6285963106144&text=Hai+kak+Ummi%2C+saya+mau+bertanya+mengenai+akun+olmat+saya&type=phone_number&app_absent=0"
                }
                target="_blank"
                className="text-black text-xs font-bold"
              >
                Butuh bantuan lanjutan ?
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Wave
        fill="white"
        className="w-screen absolute bottom-0 rotate-180 opacity-5 z-0"
      />
    </div>
  );
}
