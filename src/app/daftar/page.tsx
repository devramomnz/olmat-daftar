"use client";

import AntDatePicker from "@/components/input/AntDatePicker";
import AntEmail from "@/components/input/AntEmail";
import AntInput from "@/components/input/AntInput";
import AntItemSelect from "@/components/input/AntItemSelect";
import { useDaftar } from "@/hooks/daftar/useDaftar";
import { Form } from "antd";
import React from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { AiOutlineDelete } from "react-icons/ai";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function Daftar() {
  const {
    payload,
    iPayload,
    form,
    genderOption,
    handleSelect,
    handleAddMore,
    handleInputChange,
    handleGenderSelect,
    handleBirthday,
    handlePicture,
    handleAttachment,
  } = useDaftar();
  console.log("payload ", payload);
  console.log(iPayload);

  return (
    <>
      <div className="flex gap-2">
        <div className="h-screen w-1/6 bg-white rounded-lg drop-shadow-md p-3">
          <label className="font-bold text-sm">List Peserta</label>
          <div className="flex flex-col gap-3 justify-start mt-5">
            {payload.map((data, i) => (
              <div className="flex" key={i}>
                <button onClick={() => handleSelect(i)} className=" w-1/5 ">
                  <AiOutlineDelete />
                </button>
                <button
                  onClick={() => handleSelect(i)}
                  className="bg-gray-100 w-full text-brand-dark font-bold rounded-md"
                >
                  Peserta {i + 1}
                </button>
              </div>
            ))}
          </div>
          <button
            className="py-1 px-2 bg-brand-dark rounded-lg w-full text-white font-bold mt-5 text-sm"
            onClick={handleAddMore}
          >
            Tambah Peserta
          </button>
        </div>
        <div className="w-full h-screen bg-white rounded-lg drop-shadow-md p-3">
          <label className="font-bold text-sm">
            Data Peserta {iPayload + 1}
          </label>
          <Form
            form={form}
            // onFinish={(
            //   values: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            // ) => handleInputChange(values, iPayload)}
            // className="grid grid-cols-2 gap-3"
          >
            <AntInput
              labelName="Nama Peserta"
              name="name"
              onChange={(e) => handleInputChange(e, iPayload)}
            />
            <div className="grid grid-cols-2 gap-3">
              <AntItemSelect
                value={payload[iPayload].gender}
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
              <Form.Item name="picture">
                <FilePond
                  // files={payload[iPayload].picture}
                  allowReorder={true}
                  allowMultiple={false}
                  onupdatefiles={(e) => handlePicture(e, iPayload)}
                  name="product"
                  labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
                />
              </Form.Item>
              <Form.Item name="attachment">
                <FilePond
                  // files={payload[iPayload].attachment}
                  allowReorder={true}
                  allowMultiple={false}
                  onupdatefiles={(e) => handleAttachment(e, iPayload)}
                  name="product"
                  labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
                />
              </Form.Item>
            </div>
          </Form>
          {/* )} */}
        </div>
      </div>
    </>
  );
}
