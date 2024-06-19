// import { useLayout } from "@/hooks/zustand/layout";
import { Form } from "antd";
import { ChangeEvent, useState } from "react";

const useForgetPass = () => {
  const [form] = Form.useForm();
  //   const { setError, isError } = useLayout();
  const [email, setEmail] = useState("");

  /**
   * HANDLE CHANGE
   */

  console.log(email);
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setEmail(e.target.value);
  }

  /**
   * HANDLE SUBMIT ETC
   */

  function handleSubmit() {
    //  if (email === "") {
    //    setError(true, "Email tidak boleh kosong");
    //  }
  }

  return { form, handleChange, handleSubmit };
};

export default useForgetPass;
