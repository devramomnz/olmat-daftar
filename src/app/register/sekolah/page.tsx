"use client";

import Wave from "@/assets/wave";
import Button from "@/components/button/Button";
import AntInput from "@/components/input/AntInput";
import { Form } from "antd";
import React from "react";
import { IoSchool } from "react-icons/io5";
import AppImage from "@/components/AppImage";
import AntText from "@/components/input/AntText";
import AntEmail from "@/components/input/AntEmail";
import { appSetting } from "@/constants/appSetting";
import useRegisterSchool from "./useRegisterSekolah";
import AntItemSelect from "@/components/input/AntItemSelect";

export default function RegisterSekolah() {
  const {
    form,
    option,
    payload,
    handleSubmit,
    handleOptionSelect,
    handleInputChange,
  } = useRegisterSchool();
  console.log(payload);
  return (
    <div className="relative overflow-hidden bg-brand/5 text-white ">
      <Wave className="w-screen absolute opacity-30 -z-10" />
      <div className="lg:grid lg:grid-cols-2">
        <div className="bg-brand hidden lg:block min-h-screen relative overflow-hidden">
          <Wave className="w-screen absolute opacity-10" />
          <div className="flex flex-col justify-center h-full mb-20 font-montserrat items-center">
            <AppImage
              src={appSetting.logoEvent}
              className="w-60 h-60 m-10"
              alt="olmat-logo"
            />
            <h1 className="text-3xl font-black">{appSetting.eventName}</h1>
            <p>Daftar Sekarang !! Dan Jadilah yang TERBAIK</p>
          </div>
          <Wave className="w-screen absolute opacity-10 bottom-0 rotate-180" />
        </div>
        <div className="flex flex-col p-6 overflow-y-scroll w-full h-fit items-center">
          <Form
            form={form}
            onFinish={handleSubmit}
            className="text-lg flex flex-col max-w-[400px] mt-8 justify-center"
          >
            <div className="flex text-2xl font-montserrat gap-2 font-black text-brand-dark items-center">
              <IoSchool />
              <h1>Pendaftaran Sekolah</h1>
            </div>
            <AntItemSelect
              onChange={(e) => handleOptionSelect("province", e)}
              option={option.province}
              name="province"
              labelName="Provinsi"
            />
            <AntItemSelect
              onChange={(e) => handleOptionSelect("city", e)}
              option={option.city}
              name="city"
              labelName="Kota"
            />
            <AntItemSelect
              onChange={(e) => handleOptionSelect("subdistrict", e)}
              option={option.subdistrict}
              name="subdistrict"
              labelName="Kecamatan"
            />
            <AntText
              onChange={(e) => handleInputChange(e)}
              name="address"
              labelName="Alamat Lengkap"
            />
            <AntItemSelect
              onChange={(e) => handleOptionSelect("degree", e)}
              option={option.degree}
              name="degree"
              labelName="Jenjang Sekolah"
            />
            <AntInput
              onChange={(e) => handleInputChange(e)}
              name="name"
              labelName="Nama Sekolah"
            />
            <AntEmail
              onChange={(e) => handleInputChange(e)}
              name="email"
              labelName="Email Sekolah"
            />
            <AntInput
              onChange={(e) => handleInputChange(e)}
              name="phone"
              labelName="No Tlp Sekolah"
            />
            <p className="flex flex-col text-xs ">
              Masukkan No WhatsApp, untuk konfirmasi jika sekolah kamu berhasil
              ditambahkan
            </p>
            <AntInput
              onChange={(e) => handleInputChange(e)}
              name="whatsapp"
              placeholder="Masukkan no whatsapp"
            />
            <Button>Selesai</Button>
          </Form>
        </div>
      </div>
      <Wave className="w-screen absolute bottom-0 -z-10 rotate-180 opacity-5" />
    </div>
  );
}
