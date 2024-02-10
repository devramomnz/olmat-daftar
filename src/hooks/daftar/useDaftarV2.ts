import { IPeserta } from "@/interfaces/IPeserta";
import { useForm } from "antd/es/form/Form";
import { ChangeEvent, useEffect, useState } from "react";

export function useDaftarv2() {
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
    //  console.log("this", e[0].file);
    //  console.log(i);
    setPayload((prev) => {
      const updateImage = [...prev];
      updateImage[i] = {
        ...updateImage[i],
        picture: e[0],
      };
      return updateImage;
    });
  }
  function handleAttachment(e: any, i: number) {
    setPayload((prev) => {
      const updataAttachment = [...prev];
      updataAttachment[i] = {
        ...updataAttachment[i],
        attachment: e[0],
      };
      return updataAttachment;
    });
  }

  function handleSelect(i: number) {
    form.setFieldValue("name", payload[i].name);
    form.setFieldValue("gender", payload[i].gender);
    //  form.setFieldValue("birthday", payload[i].birthday);
    form.setFieldValue("email", payload[i].email);
    form.setFieldValue("telepon", payload[i].telepon);
    setIPayload(i);
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

  useEffect(() => {}, []);

  return {
    form,
    payload,
    genderOption,
    iPayload,
    handleSelect,
    setPayload,
    setIPayload,
    handleAddMore,
    handleGenderSelect,
    handleInputChange,
    handleBirthday,
    handlePicture,
    handleAttachment,
  };
}
