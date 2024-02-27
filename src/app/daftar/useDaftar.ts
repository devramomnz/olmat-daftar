import { useParticipantPay } from "@/hooks/zustand/useParticipantPay";
import { IPeserta } from "@/interfaces/IPeserta";
import { ROUTES } from "@/prefix/route.constant";
import { UploadFile } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export function useDaftar() {
  const router = useRouter();
  const [payload, setPayload] = useState<IPeserta[]>([
    {
      payment_id: 0,
      school_id: 0,
      name: "",
      gender: "Pilih Jenis Kelamin",
      telepon: "",
      email: "",
      birthday: "",
      picture: "",
      attachment: "",
    },
  ]);
  const [iPayload, setIPayload] = useState<number>(0);
  const [form] = useForm();
  const genderOption = [
    { label: "Laki-laki", value: "L" },
    { label: "Perempuan", value: "P" },
  ];
  const [filePicture, setFilePicture] = useState<UploadFile[]>([]);
  const [fileAtc, setFileAtc] = useState<UploadFile[]>([]);
  const { setParticipantDataPay } = useParticipantPay();

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    i: number
  ) {
    setPayload((prev) => {
      const updatedPayload = [...prev];
      updatedPayload[i] = {
        ...updatedPayload[i],
        [e.target.name]: e.target.value,
      };
      return updatedPayload;
    });
  }

  const defaultValue = [
    {
      payment_id: 0,
      school_id: 0,
      name: "",
      gender: "Pilih Jenis Kelamin",
      telepon: "",
      email: "",
      birthday: "",
      picture: "",
      attachment: "",
    },
  ];

  function handleGenderSelect(e: any, i: number) {
    setPayload((prev) => {
      const updatedGender = [...prev];
      updatedGender[i] = {
        ...updatedGender[i],
        gender: e,
      };
      return updatedGender;
    });
  }

  function handleBirthday(e: any, i: number) {
    const date = e.toString().split(/[/\s:]+/);
    const formattedDate = date[1] + "-" + date[2] + "-" + date[3];
    const birth = formattedDate;

    setPayload((prev) => {
      const updateBirthday = [...prev];
      updateBirthday[i] = {
        ...updateBirthday[i],
        birthday: birth,
      };
      return updateBirthday;
    });
  }

  function handlePicture(e: any, i: number) {
    setPayload((prev) => {
      const updateImage = [...prev];
      updateImage[i] = {
        ...updateImage[i],
        picture: e[0],
      };
      return updateImage;
    });
  }

  function handleAttachment(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    i: number
  ) {
    setPayload((prev) => {
      const updataAttachment = [...prev];
      updataAttachment[i] = {
        ...updataAttachment[i],
        attachment: JSON.stringify(e),
      };
      return updataAttachment;
    });
  }

  function handleSelect(i: number) {
    setIPayload(i);
    form.setFieldValue("gender", payload[i].gender);
    form.setFieldValue("email", payload[i].email);
    form.setFieldValue("telepon", payload[i].telepon);
    form.setFieldValue("picture", payload[i].picture);
    form.setFieldValue("attachment", payload[i].attachment);
  }

  function handleAddMore() {
    const newPeserta: IPeserta = {
      payment_id: 0,
      school_id: 0,
      name: "",
      gender: "Pilih Jenis Kelamin",
      telepon: "",
      email: "",
      birthday: "",
      picture: "",
      attachment: "",
    };

    setPayload((prev) => [...prev, newPeserta]);
    setIPayload(iPayload + 1);
    form.resetFields();
  }

  function handlePayment() {
    setParticipantDataPay({ value: payload });
    router.push(ROUTES.PAYMENT);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  function handleDelete(i: number) {
    handleSelect(i);
    setIsModalOpen(true);
    setIPayload(i);
  }
  function deletePeserta(i: number) {
    setPayload((prevPayload) => {
      const updatedPayload = prevPayload.filter((_, idx) => idx !== i);
      return updatedPayload;
    });
    handleSelect(i - 1);
    setIPayload(i - 1);
    setIsModalOpen(false);
  }

  useEffect(() => {}, []);

  return {
    form,
    payload,
    genderOption,
    iPayload,
    filePicture,
    fileAtc,
    isModalOpen,
    defaultValue,
    setIsModalOpen,
    setFileAtc,
    setFilePicture,
    handleSelect,
    setPayload,
    setIPayload,
    handleAddMore,
    handleGenderSelect,
    handleInputChange,
    handleBirthday,
    handlePicture,
    handleAttachment,
    handlePayment,
    handleDelete,
    deletePeserta,
  };
}
