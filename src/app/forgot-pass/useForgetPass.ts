// import { useLayout } from "@/hooks/zustand/layout";
import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";
import { Form } from "antd";
import { setCookie } from "cookies-next";
import { ChangeEvent, useState } from "react";

const useForgetPass = () => {
  const [form] = Form.useForm();
  const { setIsSuccess, setError } = useLayout();
  const [email, setEmail] = useState("");
  const [isSend, setIsSend] = useState(false);

  /**
   * SERVER
   */

  async function postForgotPass() {
    await api
      .post("/auth/user/forgot/password", { email })
      .then((res) => {
        setIsSuccess(true, "Berhasil mengirim email");
        setCookie("_CTokenForgot", res.data.data);
        setIsSend(true);
      })
      .catch((err) => {
        if (err.response.data.errors.email) {
          setError(true, "Email tidak terdaftar");
        }
      });
  }

  /**
   * HANDLE CHANGE
   */

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setEmail(e.target.value);
  }

  /**
   * HANDLE SUBMIT ETC
   */

  function handleSubmit() {
    if (email === "") {
      setError(true, "Email tidak boleh kosong");
    } else {
      postForgotPass();
    }
  }

  return { form, isSend, handleChange, handleSubmit };
};

export default useForgetPass;
