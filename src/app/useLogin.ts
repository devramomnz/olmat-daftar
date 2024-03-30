import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";
import { useAdminProfile } from "@/hooks/zustand/useAdminProfile";
import { useButtonLoading } from "@/hooks/zustand/useButtonLoading";
import { Form } from "antd";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { setCookie } from "cookies-next";

const useLogin = () => {
  const router = useRouter();
  const { setIsSuccess, setError } = useLayout();
  const { setIsButtonLoading } = useButtonLoading();
  const { name, setAdminProfile } = useAdminProfile();
  const [form] = Form.useForm();

  console.log(name);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setIsButtonLoading(true);
    try {
      const res = await api.post("/auth/user/login", loginData);
      setCookie("_CToken", res.data.data.token);
      setIsSuccess(true, "Selamat Datang");
      router.push("/user");
      setIsButtonLoading(false);
      setAdminProfile({
        name: res.data.data.user.name,
        registerPrice: res.data.data.school.degree.register_price,
      });
    } catch (error: any) {
      setIsButtonLoading(false);
      console.log();
      if (error == "ERR_NETWORK") {
        setError(true, "Internal Server Error");
      }
      if (error?.request?.response) {
        setError(true, "Email atau kata sandi salah");
      }
    }
  }

  useEffect(() => {
    setIsButtonLoading(false);
  }, []);

  return { form, handleChange, handleSubmit };
};
export default useLogin;
