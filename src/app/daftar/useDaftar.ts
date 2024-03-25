import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";
import { useAdminProfile } from "@/hooks/zustand/useAdminProfile";
import { useButtonLoading } from "@/hooks/zustand/useButtonLoading";
import { IParticipant } from "@/interfaces/IParticipant";
import { ROUTES } from "@/prefix/route.constant";
import { encryptString } from "@/utils/encrypt";
import { useForm } from "antd/es/form/Form";
import { UploadFile } from "antd/es/upload/interface";
import { UploadChangeParam } from "antd/lib/upload";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export function useDaftar() {
  const router = useRouter();
  const { schoolId, registerPrice } = useAdminProfile();
  const { setIsButtonLoading } = useButtonLoading();
  const { setIsSuccess, setError } = useLayout();
  const [payload, setPayload] = useState<IParticipant[]>([
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

  console.log(payload);

  const defaultValue: IParticipant = {
    payment_id: 0,
    school_id: 0,
    name: "",
    gender: "Pilih Jenis Kelamin",
    phone: "",
    email: "",
    birth: `${dayjs().year(2000)}`,
    img: [],
    attachment: [],
  };

  async function postParticipant() {
    const dataPost = Object.values(payload).map((data) => ({
      name: data.name,
      gender: data.gender,
      phone: data.phone,
      email: data.email,
      birth: dayjs(data.birth).format("DD-MM-YYYY"),
    }));

    const filePost = Object.values(payload).map((file) => ({
      imgs: file.img,
      attachmets: file.attachment,
    }));

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
          setIsSuccess(true, "Pendaftaran Berhasil");
          router.push(
            ROUTES.TRANSACTION + "/" + encryptString(`${res.data.payment.id}`)
          );
        });
    } catch (error: any) {
      if (error?.response?.data?.errors?.message) {
        setError(true, `${error.response.data.errors.message}`);
      }
    }
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
    setPayload((prev) => {
      const updateBirthday = [...prev];
      updateBirthday[i] = {
        ...updateBirthday[i],
        birth: e,
      };
      return updateBirthday;
    });
  }

  function handlePicture(e: UploadChangeParam<UploadFile>, i: number) {
    console.log("cok", e);
    setPayload((prev) => {
      const updateImage = [...prev];
      updateImage[i] = {
        ...updateImage[i],
        img: e.fileList,
      };
      return updateImage;
    });
  }

  function handleAttachment(e: UploadChangeParam<UploadFile>, i: number) {
    setPayload((prev) => {
      const updataAttachment = [...prev];
      updataAttachment[i] = {
        ...updataAttachment[i],
        attachment: e.fileList,
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
    form.setFieldValue("birth", dayjs(payload[i].birth));
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

  return {
    form,
    payload,
    genderOption,
    iPayload,
    isModalOpen,
    defaultValue,
    registerPrice,
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
