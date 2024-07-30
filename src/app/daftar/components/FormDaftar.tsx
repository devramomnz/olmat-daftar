import AntDatePicker from "@/components/input/AntDatePicker";
import AntEmail from "@/components/input/AntEmail";
import AntInput from "@/components/input/AntInput";
import AntItemSelect from "@/components/input/AntItemSelect";
import ImgUpload from "@/components/input/ImgUpload";
import { IParticipant } from "@/interfaces/IParticipant";
import { Form } from "antd";
import { DefaultOptionType } from "antd/es/select";
import React, { ChangeEvent } from "react";
import { IBlob } from "../useDaftar";

interface IProps {
  blob: IBlob[];
  form: any;
  payload: IParticipant[];
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
  handlePicture: (e: any, iPayload: number) => void;
  handleAttachment: (e: any, iPayload: number) => void;
  submitRef: any;
}

export default function FormDaftar(props: IProps) {
  const {
    iPayload,
    form,
    genderOption,
    payload,
    blob,
    submitRef,
    handleSumbmit,
    handleInputChange,
    handleAttachment,
    handleBirthday,
    handlePicture,
    handleGenderSelect,
  } = props;

  return (
    <>
      <div className="w-full min-h-screen bg-white rounded-lg drop-shadow-md overflow-hidden">
        <h1 className="font-bold bg-brand-dark text-white py-1 px-2 w-full">
          Data Peserta {iPayload + 1}
        </h1>
        <label className="font-bold text-sm"></label>
        <Form form={form} onFinish={handleSumbmit} className="p-3">
          <AntInput
            require
            labelName="Nama Peserta"
            name="name"
            onChange={(e) => handleInputChange(e, iPayload)}
          />
          <div className="grid grid-cols-2 gap-3">
            <AntItemSelect
              require
              value={payload[iPayload].gender || "pilih"}
              name="gender"
              labelName="Jenis Kelamin"
              option={genderOption}
              onChange={(e: DefaultOptionType | any) =>
                handleGenderSelect(e, iPayload)
              }
            />
            <AntDatePicker
              require
              labelName="Tanggal lahir"
              name="birth"
              onChange={(e) => handleBirthday(e, iPayload)}
            />
            <AntEmail
              require
              labelName="Email"
              name="email"
              onChange={(e) => handleInputChange(e, iPayload)}
            />
            <AntInput
              require
              labelName="No Telp"
              name="phone"
              onChange={(e) => handleInputChange(e, iPayload)}
            />
            {/* <Form.Item name="img"> */}
            {/* </Form.Item> */}
            <div>
              <h2>Foto Peserta Ukuran 4x6</h2>
              <ImgUpload
                name="img"
                title="Foto Peserta"
                className="w-full"
                file={blob[iPayload].img}
                onChange={(e) => handlePicture(e, iPayload)}
                maxSize={200}
              />
            </div>
            <div>
              <h2>Foto Kartu Pelajar / Surat Rekomendasi</h2>
              <ImgUpload
                name="attachments"
                title="Foto Kartu Pelajar / Surat Rekomendasi"
                className="w-full"
                file={blob[iPayload].attachment}
                onChange={(e) => handleAttachment(e, iPayload)}
                maxSize={200}
              />
            </div>

            {/* <AntUpload
              labelName="Foto Peserta"
              name="img"
              file={payload[iPayload].img}
              onChange={(e) => handlePicture(e, iPayload)}
            /> */}
            {/* <AntUpload
              labelName="Foto Kartu Pelajar / Surat Rekomendasi"
              file={payload[iPayload].attachment}
              name="attachment"
              onChange={(e) => handleAttachment(e, iPayload)}
            /> */}
          </div>
          <button ref={submitRef} className="hidden">
            Submit
          </button>
        </Form>

        {/* )} */}
      </div>
    </>
  );
}
