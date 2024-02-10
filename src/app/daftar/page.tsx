"use client";

import AntDatePicker from "@/components/input/AntDatePicker";
import AntEmail from "@/components/input/AntEmail";
import AntInput from "@/components/input/AntInput";
import AntItemSelect from "@/components/input/AntItemSelect";
import { Form, Modal } from "antd";
import React from "react";
import { registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { AiOutlineDelete } from "react-icons/ai";
import { useDaftar } from "@/hooks/daftar/useDaftar";
import AntUpload from "@/components/input/AntUpload";
import { Button } from "@nextui-org/react";
import PriceDaftar from "./components/ListPeserta";

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

      <div className="flex gap-2">
        <div className="min-h-screen w-3/12 flex flex-col gap-2">
          <PriceDaftar payload={payload} price={45000} freeInterval={10} />
          <div className="bg-white rounded-lg drop-shadow-md h-full overflow-hidden">
            <h1 className="font-bold bg-brand-dark text-white py-1 px-2 w-full">
              List Peserta
            </h1>
            <div className="flex flex-col gap-3 justify-start p-3 mt-2">
              {payload.map((data, i) => (
                <div className="flex" key={i}>
                  {i !== 0 && (
                    <button
                      onClick={() => handleDelete(i)}
                      className="text-red-600 text-xl w-1/5 "
                    >
                      <AiOutlineDelete />
                    </button>
                  )}
                  <button
                    onClick={() => handleSelect(i)}
                    className={`${
                      iPayload === i
                        ? "bg-brand-dark/80 text-white"
                        : "bg-gray-100"
                    } w-full text-brand-dark font-bold rounded-md`}
                  >
                    Peserta {i + 1}
                  </button>
                </div>
              ))}
              <button
                className="py-1 px-2 bg-brand-dark rounded-lg w-full text-white font-bold mt-3 text-sm"
                onClick={handleAddMore}
              >
                Tambah Peserta
              </button>
            </div>
          </div>
        </div>
        <div className="w-full min-h-screen bg-white rounded-lg drop-shadow-md overflow-hidden">
          <h1 className="font-bold bg-brand-dark text-white py-1 px-2 w-full">
            Data Peserta {iPayload + 1}
          </h1>
          <label className="font-bold text-sm"></label>
          <Form
            form={form}
            // onFinish={(
            //   values: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            // ) => handleInputChange(values, iPayload)}
            className="p-3"
          >
            <AntInput
              labelName="Nama Peserta"
              name="name"
              onChange={(e) => handleInputChange(e, iPayload)}
            />
            <div className="grid grid-cols-2 gap-3">
              <AntItemSelect
                value={payload[iPayload].gender || "pilih"}
                name="gender"
                labelName="Jenis Kelamin"
                option={genderOption}
                onChange={(e) => handleGenderSelect(e, iPayload)}
              />
              <AntDatePicker
                labelName="Tanggal lahir"
                name="birthday"
                onChange={(e) => handleBirthday(e, iPayload)}
              />
              <AntEmail
                labelName="Email"
                name="email"
                onChange={(e) => handleInputChange(e, iPayload)}
              />
              <AntInput
                labelName="No Telp"
                name="telepon"
                onChange={(e) => handleInputChange(e, iPayload)}
              />
              <AntUpload
                labelName="Foto Peserta"
                name="picture"
                file={filePicture}
                onChange={(e) => handlePicture(e, iPayload)}
              />
              <AntUpload
                labelName="Foto Kartu Pelajar / Surat Rekomendasi"
                file={fileAtc}
                name="attachment"
                onChange={(e) => handleAttachment(e, iPayload)}
              />
            </div>
          </Form>
          {/* )} */}
        </div>
      </div>
    </>
  );
}
