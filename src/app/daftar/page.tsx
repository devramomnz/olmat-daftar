"use client";

import { Modal } from "antd";
import React from "react";
import { registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { useDaftar } from "@/hooks/daftar/useDaftar";
import { Button } from "@nextui-org/react";
import PriceDaftar from "./components/PriceDaftar";
import ListPeserta from "./components/ListPeserta";
import FormDaftar from "./components/FormDaftar";
import { useSideBarStore } from "@/hooks/zustand/zustand";
import SideBarDaftar from "./components/SideBarDaftar";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function Daftar() {
  const { sideBar } = useSideBarStore();
  console.log("side", sideBar);
  const {
    payload,
    iPayload,
    form,
    genderOption,
    filePicture,
    fileAtc,
    isModalOpen,
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
  } = useDaftar();

  console.log("here", payload);
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
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => deletePeserta(iPayload)}
            className="bg-brand/20 text-sm"
            size="sm"
          >
            Ya
          </Button>
          <Button
            onClick={() => setIsModalOpen(false)}
            className="bg-brand/20 text-sm"
            size="sm"
          >
            Tidak
          </Button>
        </div>
      </Modal>

      <SideBarDaftar>
        <PriceDaftar payload={payload} price={45000} freeInterval={10} />
        <ListPeserta
          handleAddMore={handleAddMore}
          handleDelete={handleDelete}
          handleSelect={handleSelect}
          payload={payload}
          iPayload={iPayload}
        />
      </SideBarDaftar>

      <div className="flex gap-2 p-3">
        <div className="min-h-screen hidden md:w-2/5 lg:w-3/12 md:flex flex-col gap-2">
          <PriceDaftar payload={payload} price={45000} freeInterval={10} />
          <ListPeserta
            handleAddMore={handleAddMore}
            handleDelete={handleDelete}
            handleSelect={handleSelect}
            payload={payload}
            iPayload={iPayload}
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
    </>
  );
}
