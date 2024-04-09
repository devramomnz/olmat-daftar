import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";
import { useAuthVerif } from "@/hooks/zustand/useAuthVerif";
import { useButtonLoading } from "@/hooks/zustand/useButtonLoading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setCookie } from "cookies-next";

const useAuthConfirm = () => {
  const router = useRouter();
  const { setIsSuccess, setError } = useLayout();
  const { setIsButtonLoading } = useButtonLoading();
  const { hash, authEmail } = useAuthVerif();

  const [payload, setPayload] = useState({
    hash: "",
    otp: "",
  });

  async function authConfirm() {
    setIsButtonLoading(true);
    await api
      .post("auth/user/confirm", payload)
      .then((res) => {
        setCookie("_CToken", res.data.data.token);
        setIsSuccess(true, "Verifikasi akun berhasil");
        setIsButtonLoading(false);
        router.push("/user");
      })
      .catch((err: any) => {
        if (err.response.data) {
          setError(true, "Kode OTP tidak valid");
        }
        setIsButtonLoading(false);
      });
  }

  async function resendOtp() {
    setIsButtonLoading(true);
    console.log("here");
    await api
      .post("auth/user/resend/otp", payload)
      .then(() => {
        setIsSuccess(true, "OTP Dikirim");
        setIsButtonLoading(false);
      })
      .catch((err: any) => {
        if (err.response.data) {
          setError(true, "Kode");
        }
        setIsButtonLoading(false);
      });
  }

  function handleInputAuth(e: string) {
    setPayload({ ...payload, otp: e });
  }
  function handleResendOtp() {
    resendOtp();
  }

  function handleSubmitAuth() {
    authConfirm();
  }
  useEffect(() => {
    setPayload({ ...payload, hash: hash });
  }, [hash]);

  return { authEmail, handleResendOtp, handleInputAuth, handleSubmitAuth };
};

export default useAuthConfirm;
