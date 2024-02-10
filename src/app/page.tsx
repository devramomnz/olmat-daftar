"use client";

import React from "react";
import olmatLogo from "@/../public/olmat-logo.png";
import AppImage from "@/components/AppImage";
import AntInput from "@/components/input/AntInput";
import { Form } from "antd";
import Button from "@/components/button/Button";
import Link from "next/link";
import { ROUTES } from "@/prefix/route.constant";
import Wave from "@/assets/wave";
import useLogin from "@/hooks/login/useLogin";

export default function Login() {
  const { form } = useLogin();
  return (
    <div className="relative overflow-hidden bg-gradient-to-b lg:bg-gradient-to-r from-brand to-brand-dark h-screen text-white">
      <Wave className="w-screen absolute opacity-10" fill="white" />
      <div className="lg:grid lg:grid-cols-2">
        <div className="lg:flex flex-col hidden  justify-center p-6 h-full lg:h-screen w-full md:items-center lg:bg-none ">
          <div className="grid place-items-center  mb-20 font-montserrat items-center">
            <AppImage
              src={olmatLogo}
              className="w-60 h-60 m-10"
              alt="olmat-logo"
            />
            <h1 className="text-3xl font-black">OLIMPIADE MATEMATIKA 2024</h1>
            <p>Daftar Sekarang !! Dan Jadilah yang TERBAIK</p>
          </div>
        </div>
        <div className="flex flex-col justify-center p-6 h-screen w-full md:items-center lg:bg-none ">
          <div className="grid place-items-center text-3xl mb-20 font-montserrat lg:hidden gap-2 font-black items-center">
            <AppImage src={olmatLogo} className="w-20 h-20" alt="olmat-logo" />
            <h1>OLMAT UINSA</h1>
          </div>
          <h1 className="text-2xl">Masuk Akun</h1>
          <Form
            form={form}
            className="text-lg flex flex-col max-w-[] lg:w-fit justify-center"
          >
            <AntInput
              name="email"
              placeholder="Masukkan E-Mail"
              className="text-lg bg-white"
            />
            <AntInput
              name="password"
              placeholder="Masukkan Password"
              password
              className="text-lg bg-white"
              // onChange={onChange}
            />
            <div className="flex justify-center">
              <Button className="w-32 py-3 text-brand-dark">Masuk</Button>
            </div>
          </Form>
          <p className="text-xs mt-10">
            Belum punya akun ?{" "}
            <Link href={ROUTES.REGISTER} className="font-semibold">
              Yuk Buat Akun
            </Link>
          </p>
        </div>
      </div>
      <Wave
        className="w-screen absolute bottom-0 rotate-180 opacity-5"
        fill="white"
      />
    </div>
  );
}
