"use client";

import Wave from "@/assets/wave";
import Button from "@/components/button/Button";
import AntInput from "@/components/input/AntInput";
import AntItemSelect from "@/components/input/AntItemSelect";
import useRegisterSekolah from "@/hooks/register/useRegisterSekolah";
import olmatLogo from "@/../public/olmat-logo.png";
import { Form } from "antd";
import React from "react";
import { IoSchool } from "react-icons/io5";
import AppImage from "@/components/AppImage";

export default function RegisterSekolah() {
  const { form } = useRegisterSekolah();
  return (
    <div className="relative overflow-hidden bg-brand/5 text-white ">
      <div className="lg:grid lg:grid-cols-2">
        <div className="bg-brand hidden lg:block min-h-screen relative overflow-hidden">
          <Wave className="w-screen absolute opacity-30" />
          <div className="flex flex-col justify-center h-full mb-20 font-montserrat items-center">
            <AppImage
              src={olmatLogo}
              className="w-60 h-60 m-10"
              alt="olmat-logo"
            />
            <h1 className="text-3xl font-black">OLIMPIADE MATEMATIKA 2024</h1>
            <p>Daftar Sekarang !! Dan Jadilah yang TERBAIK</p>
          </div>
          <Wave className="w-screen absolute opacity-40 bottom-0 rotate-180" />
        </div>
        <div className="flex flex-col p-6 overflow-y-scroll w-full h-fit items-center">
          <Form
            form={form}
            className="text-lg flex flex-col max-w-[400px] mt-8 justify-center"
          >
            <div className="flex text-2xl font-montserrat gap-2 font-black text-brand-dark items-center">
              <IoSchool />
              <h1>Pendaftaran Sekolah</h1>
            </div>
            <AntItemSelect labelName="Provinsi" />
            <AntItemSelect labelName="Kota" />
            <AntItemSelect labelName="Kecamatan" />
            <AntInput textArea labelName="Alamat Lengkap" />
            <AntItemSelect labelName="Pilih Jenjang" />
            <AntInput labelName="Nama Sekolah" />
            <AntInput labelName="Email Sekolah" />
            <AntInput labelName="No Tlp Sekolah" />
            <p className="flex flex-col text-xs ">
              Masukkan No WhatsApp, untuk konfirmasi jika sekolah kamu berhasil
              ditambahkan
            </p>
            <AntInput placeholder="Masukkan no whatsapp" />
            <Button>Selesai</Button>
          </Form>
        </div>
      </div>
      {/* <Wave className="w-screen absolute bottom-0 rotate-180 opacity-5" /> */}
    </div>
  );
}
