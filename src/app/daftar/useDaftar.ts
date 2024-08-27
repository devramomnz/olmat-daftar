import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";
import { useAdminProfile } from "@/hooks/zustand/useAdminProfile";
import { useButtonLoading } from "@/hooks/zustand/useButtonLoading";
import { IEventSetting } from "@/interfaces/IEventSetting";
import { IParticipant } from "@/interfaces/IParticipant";
import { ROUTES } from "@/prefix/routes";
import { encryptString } from "@/utils/encrypt";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export interface IBlob {
  img: string | undefined;
  attachment: string | undefined;
}

export interface IOptionsReg {
  city: { label: string; value: string }[];
  subdistrict: { label: string; value: string }[];
  school: { label: string; value: string }[];
}

export function useDaftar() {
  const router = useRouter();
  const submitButton = useRef<any>(null);
  const {
    type,
    schoolId,
    regionId,
    schoolName,
    registerPrice,
    setAdminProfile,
  } = useAdminProfile();
  const { setIsButtonLoading } = useButtonLoading();
  const { setIsSuccess, setError } = useLayout();

  /**
   * STATE
   */

  const [isModalAdmin, setIsModalAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payload, setPayload] = useState<IParticipant[]>([
    {
      payment_id: 0,
      school_id: 0,
      name: "",
      gender: "Pilih Jenis Kelamin",
      phone: "",
      email: "",
      birth: "",
      img: undefined,
      attachment: undefined,
    },
  ]);
  const [iPayload, setIPayload] = useState<number>(0);
  const [form] = useForm();
  const genderOption = [
    { label: "Laki-laki", value: "L" },
    { label: "Perempuan", value: "P" },
  ];
  const [option, setOption] = useState<IOptionsReg>({
    city: [{ label: "", value: "" }],
    subdistrict: [{ label: "", value: "" }],
    school: [{ label: "", value: "" }],
  });

  const [blob, setBlob] = useState<IBlob[]>([
    {
      img: undefined,
      attachment: undefined,
    },
  ]);

  const [eventSetting, setEventSetting] = useState<IEventSetting>({
    amount: 0,
    free: 0,
  });

  const defaultValue: IParticipant = {
    payment_id: 0,
    school_id: 0,
    name: "",
    gender: "Pilih Jenis Kelamin",
    phone: "",
    email: "",
    birth: `${dayjs().year(2000)}`,
    img: undefined,
    attachment: undefined,
  };

  /**
   * API
   */

  async function getCity() {
    await api.get(`/location-api/cities/${regionId}`).then((res) => {
      const Options = res.data.map((city: any) => ({
        value: `${city.id}`,
        label: city.name,
      }));
      setOption({ ...option, city: Options });
    });
  }
  async function getSubdistrict(e: number) {
    await api.get(`/location-api/subdistrict/${e}`).then((res) => {
      const Options = res.data.map((sub: any) => ({
        value: `${sub.id}`,
        label: sub.name,
      }));
      setOption({ ...option, subdistrict: Options });
    });
  }
  async function getSchool(e: number) {
    await api.get(`/location-api/school/${e}`).then((res) => {
      const Options = res.data.map((school: any) => ({
        value: `${school.id}`,
        label: school.name,
      }));
      setOption({ ...option, school: Options });
    });
  }
  async function getSchoolById(e: number) {
    await api.get(`/school/${e}`).then((res) => {
      setAdminProfile({
        schoolName: res.data.name,
        schoolId: res.data.id,
        registerPrice: res.data.degree.register_price,
      });
    });
  }

  async function getEventSetting() {
    await api.get(`/event-setting`).then((res) => {
      setEventSetting({
        amount: res.data[0].amount,
        free: res.data[0].free,
      });
    });
  }

  async function postParticipant() {
    setIsButtonLoading(true);
    const dataPost = Object.values(payload).map((data) => ({
      name: data.name.toUpperCase(),
      gender: data.gender,
      phone: data.phone,
      email: data.email,
      birth: data.birth,
    }));

    const filePost = Object.values(payload).map((file) => ({
      imgs: file.img,
      attachmets: file.attachment,
    }));
    // Validasi untuk mengecek apakah ada imgs atau attachments yang undefined
    for (let i = 0; i < filePost.length; i++) {
      if (!filePost[i].imgs) {
        setIsButtonLoading(false);
        setError(true, `Foto Peserta ke-${i + 1} tidak valid`);
        return; // Hentikan proses jika ada file yang undefined
      }
      if (!filePost[i].attachmets) {
        setIsButtonLoading(false);
        setError(
          true,
          `Kartu pelajar atau surat rekomendasi Peserta ke-${i + 1} tidak valid`
        );
        return; // Hentikan proses jika ada file yang undefined
      }
    }
    try {
      const payloadForm = new FormData();
      dataPost.map((participat) => {
        payloadForm.append("participants", JSON.stringify(participat));
      });

      payloadForm.append("school_id", `${schoolId}`);
      payloadForm.append("payment_code", "QRIS");
      filePost.forEach((file) => {
        payloadForm.append("imgs", file.imgs);
        payloadForm.append("attachments", file.attachmets);
      });

      await api
        .post(`/participant`, payloadForm, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setIsSuccess(true, "Pendaftaran Berhasil");
          setIsButtonLoading(false);
          router.push(
            ROUTES.TRANSACTION + "/" + encryptString(`${res.data.payment.id}`)
          );
        })
        .catch((err: any) => {
          setIsButtonLoading(false);
          setError(true, "Pendaftaran Gagal");
          console.log(err);
        });
    } catch (error: any) {
      if (error?.response?.data?.errors?.message) {
        setIsButtonLoading(false);
        setError(true, `${error.response.data.errors.message}`);
      }
    }
  }

  /**
   *  HANDLE CHANGE
   */
  function handleOptionSelect(name: string, e: any) {
    if (name === "city") {
      getSubdistrict(e);
    }
    if (name === "subdistrict") {
      getSchool(e);
    }
    if (name === "school") {
      setAdminProfile({ schoolId: e });
      getSchoolById(e);
      setIsModalAdmin(false);
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
    const date = dayjs(e).toISOString();
    setPayload((prev) => {
      const updateBirthday = [...prev];
      updateBirthday[i] = {
        ...updateBirthday[i],
        birth: date,
      };
      return updateBirthday;
    });
  }

  function handlePicture(e: any, i: number) {
    const blob = URL.createObjectURL(e);
    setBlob((prev) => {
      const updateImage = [...prev];
      updateImage[i] = {
        ...updateImage[i],
        img: blob,
      };
      return updateImage;
    });
    setPayload((prev) => {
      const updateImage = [...prev];
      updateImage[i] = {
        ...updateImage[i],
        img: e,
      };
      return updateImage;
    });
  }

  function handleAttachment(e: any, i: number) {
    const blob = URL.createObjectURL(e);
    setBlob((prev) => {
      const updataAttachment = [...prev];
      updataAttachment[i] = {
        ...updataAttachment[i],
        attachment: blob,
      };
      return updataAttachment;
    });
    setPayload((prev) => {
      const updataAttachment = [...prev];
      updataAttachment[i] = {
        ...updataAttachment[i],
        attachment: e,
      };
      return updataAttachment;
    });
  }

  /**
   * HANDLE SUBMIT ETC
   */

  function handleSchoolBtn() {
    getCity();
    setIsModalAdmin(true);
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
    setBlob((prev) => [
      ...prev,
      {
        img: undefined,
        attachment: undefined,
      },
    ]);
  }

  function handlePayment() {
    submitButton.current.click();
  }

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
    getEventSetting();
  }, []);

  return {
    type,
    blob,
    form,
    payload,
    genderOption,
    iPayload,
    option,
    isModalAdmin,
    isModalOpen,
    defaultValue,
    registerPrice,
    submitButton,
    eventSetting,
    schoolName,
    schoolId,
    handleSchoolBtn,
    handleOptionSelect,
    postParticipant,
    setIsModalOpen,
    setIsModalAdmin,
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
