import { deleteCookie, getCookie } from "cookies-next";
import { useParams, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { ChangeEvent, useEffect, useState } from "react";
import { Form } from "antd";
import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";

interface IPayload {
  hash?: string;
  email?: string;
  newPassword?: string;
}

interface IToken {
  exp: number;
  email: string;
}

const useUpdatePass = () => {
  const route = useRouter();
  const [form] = Form.useForm();
  const { setError, setIsSuccess } = useLayout();
  const token = getCookie("_CTokenForgot");
  const slug = useParams().slug.toString();
  const [payload, setPayload] = useState<IPayload>();
  const [isHash, setIsHash] = useState(true);

  /**
   * SERVER
   */

  async function getHash() {
    await api.get(`/auth/user/hash/${slug}`).then((res) => {
      if (!res.data.data) {
        setIsHash(false);
      }
    });
  }

  async function postNewPass() {
    await api
      .post("/auth/user/forgot/password/update", payload)
      .then(() => {
        setIsSuccess(true, "Berhasil update password");
        route.push("/");
        deleteCookie("_CTokenForgot");
      })
      .catch((err) => {
        setError(true, "Gagal update password");
        throw err;
      });
  }

  /**
   * DECODE COOKIE
   */

  function decodeToken() {
    const decoded = jwtDecode(`${token}`) as IToken;
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime > decoded.exp) {
      deleteCookie("_CTokenForgot");
    }
    if (decoded.email) {
      setPayload((prevPayload) => ({ ...prevPayload, email: decoded.email }));
    }
  }

  /**
   * HANDLE CHANGE
   */

  function handleChangeInput(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  }

  /**
   * HANDLE SUBMIT ETC
   */

  function handleSubmit() {
    postNewPass();
  }

  useEffect(() => {
    if (token) {
      decodeToken();
    }
    if (slug) {
      getHash();
      setPayload((prevPayload) => ({ ...prevPayload, hash: slug }));
    }
  }, []);

  return { form, isHash, handleChangeInput, handleSubmit };
};

export default useUpdatePass;
