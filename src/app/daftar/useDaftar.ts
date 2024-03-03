import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";
import { useAdminProfile } from "@/hooks/zustand/useAdminProfile";
import { useButtonLoading } from "@/hooks/zustand/useButtonLoading";
import { useParticipantPay } from "@/hooks/zustand/useParticipantPay";
import { IPeserta } from "@/interfaces/IPeserta";
import { UploadFile } from "antd";
import { useForm } from "antd/es/form/Form";
import { ChangeEvent, useEffect, useState } from "react";

export function useDaftar() {
  // const router = useRouter();
  const { schoolId } = useAdminProfile();
  const { setIsButtonLoading } = useButtonLoading();
  const {} = useLayout();
  const [payload, setPayload] = useState<IPeserta[]>([
    {
      payment_id: 0,
      school_id: 0,
      name: "",
      gender: "Pilih Jenis Kelamin",
      phone: "",
      email: "",
      birth: "",
      img: "",
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

  console.log("payload", payload);
  console.log(
    "legh",
    Object.values(payload).map((dat) => ({
      img: dat.img.length,
      ath: dat.attachment.length,
    }))
  );

  const defaultValue: IPeserta = {
    payment_id: 0,
    school_id: 0,
    name: "",
    gender: "Pilih Jenis Kelamin",
    phone: "",
    email: "",
    birth: "",
    img: "",
    attachment: "",
  };

  const filePost = Object.values(payload).map((file) => ({
    imgs: file.img,
    attachmets: file.attachment,
  }));
  console.log("this a", filePost);

  async function postParticipant() {
    setIsButtonLoading(true);
    try {
      const dataPost = Object.values(payload).map((data) => ({
        name: data.name,
        gender: data.gender,
        phone: data.phone,
        email: data.email,
        birth: data.birth,
      }));
      const payloadForm = new FormData();
      payloadForm.append("participants", JSON.stringify(dataPost));
      payloadForm.append("school_id", `${schoolId}`);
      payloadForm.append("payment_code", "QRIS");
      filePost.forEach((file) => {
        payloadForm.append("imgs", JSON.stringify(file.imgs));
        payloadForm.append(`attachments`, JSON.stringify(file.attachmets));
      });

      console.log("thisis", payloadForm);

      await api.post(`/participant`, payloadForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {}
  }

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
        birth: birth,
      };
      return updateBirthday;
    });
  }

  function handlePicture(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    i: number
  ) {
    setPayload((prev) => {
      const updateImage = [...prev];
      updateImage[i] = {
        ...updateImage[i],
        img: JSON.stringify(e),
      };
      // console.log(e.target.value.length);
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
    form.setFieldValue("name", payload[i].name);
    form.setFieldValue("gender", payload[i].gender);
    form.setFieldValue("email", payload[i].email);
    form.setFieldValue("phone", payload[i].phone);
    // form.setFieldValue("birth", payload[i].birth);
    form.setFieldValue("picture", payload[i].img);
    form.setFieldValue("attachment", payload[i].attachment);
  }

  function handleAddMore() {
    setPayload((prev) => [...prev, defaultValue]);
    setIPayload(iPayload + 1);
    form.resetFields();
  }

  function handlePayment() {
    postParticipant();
    setParticipantDataPay({ value: payload });
    // router.push(ROUTES.PAYMENT);
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

  useEffect(() => {
    // postParticipant();
  }, []);

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
