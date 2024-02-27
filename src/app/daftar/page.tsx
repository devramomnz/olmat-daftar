"use client";

import { Modal } from "antd";
import React from "react";
import { registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { Button } from "@nextui-org/react";
import PriceDaftar from "./components/PriceDaftar";
import ListPeserta from "./components/ListPeserta";
import FormDaftar from "./components/FormDaftar";
import SideBarDaftar from "./components/SideBarDaftar";
import { useDaftar } from "./useDaftar";
import { IoArrowBackCircle } from "react-icons/io5";
import Link from "next/link";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function Daftar() {
  const {
    payload,
    iPayload,
    form,
    genderOption,
    filePicture,
    fileAtc,
    isModalOpen,
    defaultValue,
    setIsModalOpen,
    handleSelect,
    handleAddMore,
    handleInputChange,
    handleGenderSelect,
    handleBirthday,
    handlePicture,
    handleAttachment,
    handleDelete,
    deletePeserta,
    handlePayment,
  } = useDaftar();

  return (
    <>
      <Modal
        title="Konfirmasi"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        className="text-black"
        footer=""
      >
        <p>Apakah anda yakin untuk menghapus peserta {iPayload + 1} ?</p>
        <div className="flex justify-end gap-4 text-white">
          <Button
            onClick={() => deletePeserta(iPayload)}
            className="bg-brand/20 text-sm font-bold"
            size="sm"
          >
            Ya
          </Button>
          <Button
            onClick={() => setIsModalOpen(false)}
            className="bg-brand-dark text-sm text-white font-bold"
            size="sm"
          >
            Tidak
          </Button>
        </div>
      </Modal>

      <SideBarDaftar>
        <ListPeserta
          handleAddMore={handleAddMore}
          handleDelete={handleDelete}
          handleSelect={handleSelect}
          payload={payload}
          iPayload={iPayload}
        />
      </SideBarDaftar>

      <div className="pt-3 px-4 gap-2 flex">
        <Link href={"/user"} className="flex items-center gap-3 ">
          <IoArrowBackCircle className="text-2xl" />
          Kembali
        </Link>
      </div>
      <div className="flex gap-2 p-3">
        <div className="min-h-screen hidden md:w-2/5 lg:w-3/12 md:flex flex-col gap-2">
          <div className="hidden md:block">
            <PriceDaftar
              defaultValue={defaultValue}
              payload={payload}
              handlePay={handlePayment}
              price={45000}
              freeInterval={10}
            />
          </div>
          <ListPeserta
            handleAddMore={handleAddMore}
            handleDelete={handleDelete}
            handleSelect={handleSelect}
            payload={payload}
            iPayload={iPayload}
          />
        </div>
        <div className="flex w-screen flex-col gap-5">
          <div className="md:hidden">
            <PriceDaftar
              defaultValue={defaultValue}
              payload={payload}
              handlePay={handlePayment}
              price={45000}
              freeInterval={10}
            />
          </div>
          <FormDaftar
            form={form}
            payload={payload}
            iPayload={iPayload}
            fileAtc={fileAtc}
            filePicture={filePicture}
            genderOption={genderOption}
            handleInputChange={handleInputChange}
            handleGenderSelect={handleGenderSelect}
            handleAttachment={handleAttachment}
            handleBirthday={handleBirthday}
            handlePicture={handlePicture}
          />
        </div>
      </div>
    </>
  );
}
