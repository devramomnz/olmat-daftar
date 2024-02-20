import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";
import { useAdminProfile } from "@/hooks/zustand/useAdminProfile";
import { useButtonLoading } from "@/hooks/zustand/useButtonLoading";
import { Form } from "antd";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { setCookie } from "cookies-next";

const useLogin = () => {
  const router = useRouter();
  const { setIsSuccess, setError } = useLayout();
  const { setIsButtonLoading } = useButtonLoading();
  const { setAdminProfile } = useAdminProfile();
  const [form] = Form.useForm();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  console.log(loginData);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    try {
      setIsButtonLoading(true);
      const res = await api.post("/auth/user/login", loginData);
      setCookie("_CToken", res.data.data.token);
      setIsSuccess(true, "Selamat Datang");
      setAdminProfile({
        name: res.data.data.user.name,
      });
      router.push("/user");
      setIsButtonLoading(false);
    } catch (error) {
      setIsButtonLoading(false);
      if (error == "ERR_NETWORK") {
        setError(true, "Internal Server Error");
      } else {
        setError(true, "Email atau kata sandi salah");
      }
    }
  }

  return { form, handleChange, handleSubmit };
};
export default useLogin;
