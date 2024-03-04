import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";
import { useAdminProfile } from "@/hooks/zustand/useAdminProfile";
import { useButtonLoading } from "@/hooks/zustand/useButtonLoading";
import { useParticipantPay } from "@/hooks/zustand/useParticipantPay";
import { IPeserta } from "@/interfaces/IPeserta";
import { ROUTES } from "@/prefix/route.constant";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export function useDaftar() {
  const router = useRouter();
  const { schoolId } = useAdminProfile();
  const { setIsButtonLoading } = useButtonLoading();
  const {} = useLayout();
  const {
    setPayData,
    invoice,
    participantAmount,
    participantData,
    payAmount,
    qrString,
  } = useParticipantPay();
  console.log("invoice", invoice);
  console.log("paramount", participantAmount);
  console.log("partdata", participantData);
  console.log("payamount", payAmount);
  console.log("qr", qrString);
  const [payload, setPayload] = useState<IPeserta[]>([
    {
      payment_id: 0,
      school_id: 0,
      name: "",
      gender: "Pilih Jenis Kelamin",
      phone: "",
      email: "",
      birth: "",
      img: [],
      attachment: [],
    },
  ]);
  const [iPayload, setIPayload] = useState<number>(0);
  const [form] = useForm();
  const genderOption = [
    { label: "Laki-laki", value: "L" },
    { label: "Perempuan", value: "P" },
  ];

  const defaultValue: IPeserta = {
    payment_id: 0,
    school_id: 0,
    name: "",
    gender: "Pilih Jenis Kelamin",
    phone: "",
    email: "",
    birth: "",
    img: [],
    attachment: [],
  };

  const dataPost = Object.values(payload).map((data) => ({
    name: data.name,
    gender: data.gender,
    phone: data.phone,
    email: data.email,
    birth: data.birth,
  }));

  console.log("data Pots", dataPost);

  const filePost = Object.values(payload).map((file) => ({
    imgs: file.img,
    attachmets: file.attachment,
  }));
  console.log("this a");

  async function postParticipant() {
    setIsButtonLoading(true);
    try {
      const payloadForm = new FormData();
      dataPost.map((participat) => {
        payloadForm.append("participants", JSON.stringify(participat));
      });
      payloadForm.append("school_id", `${schoolId}`);
      payloadForm.append("payment_code", "QRIS");
      filePost.forEach((file) => {
        payloadForm.append("imgs", file.imgs[0].originFileObj);
        payloadForm.append("attachments", file.attachmets[0].originFileObj);
      });

      await api
        .post(`/participant`, payloadForm, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setPayData({
            invoice: res.data.payment.invoice,
            qrString: res.data.payment.action.qr_string,
            participantAmount: res.data.payment.participant_amounts,
            payAmount: res.data.payment.amount,
            value: res.data.participants,
            expired: res.data.payment.expired_at,
          });
        })
        .then(() => router.push(ROUTES.PAYMENT));
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

  function handlePicture(e: any[], i: number) {
    console.log("img", e);
    setPayload((prev) => {
      const updateImage = [...prev];
      updateImage[i] = {
        ...updateImage[i],
        img: e,
      };
      return updateImage;
    });
  }

  function handleAttachment(e: any[], i: number) {
    console.log("this attc", e);
    setPayload((prev) => {
      const updataAttachment = [...prev];
      updataAttachment[i] = {
        ...updataAttachment[i],
        attachment: e,
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
  }

  function handleAddMore() {
    setPayload((prev) => [...prev, defaultValue]);
    setIPayload(iPayload + 1);
    form.resetFields();
  }

  function handlePayment() {
    postParticipant();
    // setParticipantDataPay({ value: payload });
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
    isModalOpen,
    defaultValue,
    setIsModalOpen,
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
