import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";
import { useButtonLoading } from "@/hooks/zustand/useButtonLoading";
import { ISchool } from "@/interfaces/ISchool";
import { Form } from "antd";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

interface IOptions {
  province: { label: string; value: string }[];
  city: { label: string; value: string }[];
  subdistrict: { label: string; value: string }[];
  degree: { label: string; value: string }[];
}

const useRegisterSchool = () => {
  const router = useRouter();
  const { setIsSuccess, setError } = useLayout();
  const { setIsButtonLoading } = useButtonLoading();
  const [form] = Form.useForm();
  const [payload, setPayload] = useState<ISchool>({
    province_id: "",
    city_id: "",
    subdistrict_id: 0,
    address: "",
    degree_id: "",
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
  });

  const [option, setOption] = useState<IOptions>({
    province: [{ label: "", value: "" }],
    city: [{ label: "", value: "" }],
    subdistrict: [{ label: "", value: "" }],
    degree: [{ label: "", value: "" }],
  });

  async function getProvince() {
    await api.get("/location-api/province").then((res) => {
      const Options = res.data.map((prov: any) => ({
        value: `${prov.id}`,
        label: prov.name,
      }));
      setOption({ ...option, province: Options });
    });
  }
  async function getCity(e: number) {
    await api.get(`/location-api/city/${e}`).then((res) => {
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
  async function getDegree() {
    await api.get(`/location-api/degree`).then((res) => {
      const Options = res.data.map((degree: any) => ({
        value: `${degree.id}`,
        label: degree.name,
      }));
      setOption({ ...option, degree: Options });
    });
  }

  async function createSchool() {
    setIsButtonLoading(true);
    await api
      .post("/school", payload)
      .then(() => {
        setIsSuccess(true, "Pendaftaran Sekolah Terkirim");
        setIsButtonLoading(false);
        router.push("/register");
      })
      .catch((err: any) => {
        setIsButtonLoading(false);
        if (err?.response?.data?.errors?.code) {
          return Promise.reject(new Error("Code already exist"));
        } else if (err.response.data.errors.email) {
          setError(true, "Email telah terdaftar");
        } else if (err.response.data.errors.phone) {
          setError(true, "Nomor telah terdaftar");
        } else {
          setError(true, "Pendaftaran Sekolah Gagal Terkirim");
        }
      });
  }

  function handleOptionSelect(name: string, e: any) {
    if (name === "province") {
      setPayload({ ...payload, province_id: e });
      getCity(e);
    }
    if (name === "city") {
      setPayload({ ...payload, city_id: e });
      getSubdistrict(e);
    }
    if (name === "subdistrict") {
      setPayload({ ...payload, subdistrict_id: e });
      getDegree();
    }
    if (name === "degree") {
      setPayload({ ...payload, degree_id: e });
    }
  }

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const newE = e.target.value.toUpperCase();
    setPayload({ ...payload, [e.target.name]: newE });
  }

  function handleSubmit() {
    createSchool();
  }

  useEffect(() => {
    getProvince();
  }, []);

  return {
    form,
    option,
    payload,
    handleOptionSelect,
    handleSubmit,
    handleInputChange,
  };
};
export default useRegisterSchool;
