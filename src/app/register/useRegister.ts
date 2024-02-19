import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";
import { useButtonLoading } from "@/hooks/zustand/useButtonLoading";
import { IUser } from "@/interfaces/IUser";
import { Form } from "antd";
import { ChangeEvent, useEffect, useState } from "react";

interface IOptions {
  province: { label: string; value: string }[];
  city: { label: string; value: string }[];
  subdistrict: { label: string; value: string }[];
  school: { label: string; value: string }[];
}

const useRegister = () => {
  const { setIsSuccess, setError } = useLayout();
  const { setIsButtonLoading } = useButtonLoading();
  const [form] = Form.useForm();
  const [payload, setPayload] = useState<IUser>({
    email: "",
    phone: "",
    password: "",
    password2: "",
    name: "",
    school_id: 0,
  });
  const [option, setOption] = useState<IOptions>({
    province: [{ label: "", value: "" }],
    city: [{ label: "", value: "" }],
    subdistrict: [{ label: "", value: "" }],
    school: [{ label: "", value: "" }],
  });

  async function createAccount() {
    setIsButtonLoading(true);
    await api
      .post("/auth/user/register", payload)
      .then(() => {
        setIsSuccess(true, "Pendaftaran Akun Terkirim");
        setIsButtonLoading(false);
      })
      .catch((err: any) => {
        if (err?.response?.data?.errors?.code) {
          return Promise.reject(new Error("Code already exist"));
        }
        setError(true, "Pendaftara Akun Tidak Terkirim");
        setIsButtonLoading(false);
      });
  }

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
  async function getSchool(e: number) {
    await api.get(`/location-api/school/${e}`).then((res) => {
      console.log("schoolRes", res);
      const Options = res.data.map((school: any) => ({
        value: `${school.id}`,
        label: school.name,
      }));
      setOption({ ...option, school: Options });
    });
  }

  function handleOptionSelect(name: string, e: any) {
    console.log("this", e);
    console.log("name", name);
    if (name === "province") {
      getCity(e);
    }
    if (name === "city") {
      getSubdistrict(e);
    }
    if (name === "subdistrict") {
      getSchool(e);
    }
    if (name === "school") {
      setPayload({ ...payload, school_id: e });
    }
  }

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    createAccount();
  }

  console.log(payload);

  useEffect(() => {
    getProvince();
  }, []);

  return {
    form,
    payload,
    option,
    setPayload,
    setOption,
    handleOptionSelect,
    handleInputChange,
    handleSubmit,
  };
};
export default useRegister;
