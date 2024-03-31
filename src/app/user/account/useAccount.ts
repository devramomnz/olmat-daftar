import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";
import { useAdminProfile } from "@/hooks/zustand/useAdminProfile";
import { useButtonLoading } from "@/hooks/zustand/useButtonLoading";
import { Form } from "antd";
import { ChangeEvent, useEffect, useState } from "react";

interface IPass {
  currentPassword?: string;
  password?: string;
}

interface IPayload {
  name?: string;
  phone?: string;
  email?: string;
}

const useAccount = () => {
  const { setAdminProfile } = useAdminProfile();
  const [form] = Form.useForm();
  const [formPass] = Form.useForm();
  const { setIsButtonLoading } = useButtonLoading();
  const { setIsSuccess, setError } = useLayout();

  const [isEdit, setIsEdit] = useState(false);
  const [isChangePass, setIsChangePass] = useState(false);
  const [payloadPass, setPayloadPass] = useState<IPass>();
  const [payload, setPayload] = useState<IPayload>();

  async function setValue() {
    try {
      const res = await api.get(`/auth/user/me`);
      setAdminProfile({
        name: res.data.data.name,
        email: res.data.data.email,
        phone: res.data.data.phone,
        schoolName: res.data.data.school.name,
        schoolId: res.data.data.school.id,
        degreeId: res.data.data.school.degree.id,
        registerPrice: res.data.data.school.degree.register_price,
        degreeName: res.data.data.school.degree.name,
      });
      setPayload({
        ...payload,
        name: res.data.data.name,
        email: res.data.data.email,
        phone: res.data.data.phone,
      });
      form.setFieldValue("name", res.data.data.name);
      form.setFieldValue("phone", res.data.data.phone);
      form.setFieldValue("email", res.data.data.email);
    } catch (error) {}
  }

  async function updatePass() {
    setIsButtonLoading(true);
    await api
      .patch(`/auth/user/update-me`, payloadPass)
      .then(() => {
        setIsButtonLoading(false);
        setIsSuccess(true, "Berhasil Update Password");
      })
      .catch(() => {
        setIsButtonLoading(false);
        setError(true, "Gagal Update Password");
      });
  }

  async function updateAccount() {
    setIsButtonLoading(true);
    await api
      .patch(`/auth/user/update-me`, payload)
      .then(() => {
        setValue();
        setIsButtonLoading(false);
        setIsSuccess(true, "Berhasil Update Akun");
      })
      .catch(() => {
        setIsButtonLoading(false);
        setError(true, "Gagal Update Akun");
      });
  }
  /**
   * HANDLE CHANGE
   */

  function handleInputChangePassword(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPayloadPass({ ...payloadPass, [e.target.name]: e.target.value });
  }

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  }

  /**
   * HANDLE SUMBIT ETC
   */

  function handleEdit() {
    setIsEdit(true);
    setIsChangePass(false);
    setValue();
  }
  function handleCancelEdit() {
    setIsEdit(false);
    setIsChangePass(false);
  }

  function handleChangePass() {
    setIsChangePass(true);
    setIsEdit(false);
    formPass.resetFields();
  }
  function handleCancelChangePass() {
    setIsChangePass(false);
    setIsEdit(false);
  }
  function handleSubmitPass() {
    updatePass();
    setIsChangePass(false);
    setIsEdit(false);
    setPayloadPass(undefined);
    formPass.resetFields();
  }
  function handleSubmitAccount() {
    updateAccount();
    setIsChangePass(false);
    setIsEdit(false);
    setPayload(undefined);
  }

  useEffect(() => {
    setValue();
  }, []);

  return {
    form,
    formPass,
    isEdit,
    isChangePass,
    handleEdit,
    handleCancelEdit,
    handleChangePass,
    handleCancelChangePass,
    setIsChangePass,
    handleInputChangePassword,
    handleInputChange,
    handleSubmitPass,
    handleSubmitAccount,
  };
};
export default useAccount;
