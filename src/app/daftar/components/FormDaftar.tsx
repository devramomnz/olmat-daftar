import AntDatePicker from "@/components/input/AntDatePicker";
import AntEmail from "@/components/input/AntEmail";
import AntInput from "@/components/input/AntInput";
import AntItemSelect from "@/components/input/AntItemSelect";
import AntUpload from "@/components/input/AntUpload";
import { IPeserta } from "@/interfaces/IPeserta";
import { Form, UploadFile } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { UploadChangeParam } from "antd/es/upload";
import React, { ChangeEvent } from "react";

interface IProps {
  form: any;
  payload: IPeserta[];
  iPayload: number;
  genderOption: any;
  handleSumbmit: () => void;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    iPayload: number
  ) => void;
  handleGenderSelect: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    iPayload: number
  ) => void;
  handleBirthday: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    iPayload: number
  ) => void;
  handlePicture: (e: UploadChangeParam<UploadFile>, iPayload: number) => void;
  handleAttachment: (
    e: UploadChangeParam<UploadFile>,
    iPayload: number
  ) => void;
}

export default function FormDaftar(props: IProps) {
  const {
    iPayload,
    form,
    genderOption,
    payload,
    handleSumbmit,
    handleInputChange,
    handleAttachment,
    handleBirthday,
    handlePicture,
    handleGenderSelect,
  } = props;

  console.log(payload[0].img);
  return (
    <>
      <div className="w-full min-h-screen bg-white rounded-lg drop-shadow-md overflow-hidden">
        <h1 className="font-bold bg-brand-dark text-white py-1 px-2 w-full">
          Data Peserta {iPayload + 1}
        </h1>
        <label className="font-bold text-sm"></label>
        <Form form={form} onFinish={handleSumbmit} className="p-3">
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
              onChange={(e: DefaultOptionType | any) =>
                handleGenderSelect(e, iPayload)
              }
            />
            <AntDatePicker
              labelName="Tanggal lahir"
              name="birth"
              onChange={(e) => handleBirthday(e, iPayload)}
            />
            <AntEmail
              labelName="Email"
              name="email"
              onChange={(e) => handleInputChange(e, iPayload)}
            />
            <AntInput
              labelName="No Telp"
              name="phone"
              onChange={(e) => handleInputChange(e, iPayload)}
            />
            <AntUpload
              labelName="Foto Peserta"
              name="img"
              file={payload[iPayload].img}
              onChange={(e) => handlePicture(e, iPayload)}
            />
            <AntUpload
              labelName="Foto Kartu Pelajar / Surat Rekomendasi"
              file={payload[iPayload].attachment}
              name="attachment"
              onChange={(e) => handleAttachment(e, iPayload)}
            />
          </div>
        </Form>

        {/* )} */}
      </div>
    </>
  );
}
