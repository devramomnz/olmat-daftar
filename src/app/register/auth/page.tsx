"use client";

import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import otpMail from "@/assets/lottie/otpMail.json";
import otpWaiting from "@/assets/lottie/otpWaiting.json";
import AuthCode from "react-auth-code-input";
import useAuthConfirm from "./useAuthConfirm";
import Button from "@/components/button/Button";
import Countdown from "react-countdown";
import { deleteCookie, getCookie } from "cookies-next";
import api from "@/config/axiosConfig";
import { useAdminProfile } from "@/hooks/zustand/useAdminProfile";
import { useRouter } from "next/navigation";

export default function Auth() {
  const router = useRouter();

  const token = getCookie("_CToken");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  const { setAdminProfile } = useAdminProfile();

  const getMe = async () => {
    try {
      const res = await api.get(`/auth/user/me`);
      setAdminProfile({
        name: res.data.data.name,
        email: res.data.data.email,
        phone: res.data.data.phone,
        schoolName: res.data.data.school.name,
        schoolId: res.data.data.school.id,
        degreeId: res.data.data.school.degree.id,
        degreeName: res.data.data.school.degree.name,
      });
      router.push("/user");
    } catch (error) {
      deleteCookie("_CToken");
      router.push("/");
    }
  };

  const { authEmail, handleInputAuth, handleResendOtp, handleSubmitAuth } =
    useAuthConfirm();
  const [show, setShow] = useState(false);
  const [resetCount, setResetCount] = useState(0);

  function handleResetCount() {
    console.log("press");
    setResetCount((prevKey) => prevKey + 1);
  }

  useEffect(() => {
    getMe();
    const timer = setTimeout(() => {
      setShow(true);
    }, 2850);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen p-4 w-screen bg-gradient-to-b from-brand to-white grid place-items-center">
      {!show ? (
        <Lottie animationData={otpMail} autoPlay loop />
      ) : (
        <div className="bg-white py-8 text-center flex flex-col justify-center w-full  md:w-2/5 lg:w-3/12 px-4 rounded-xl drop-shadow-md ">
          <h2 className="font-bold">Kode OTP telah dikirim</h2>
          <h2 className="text-xs">
            ke <span className="font-bold">{authEmail}</span>
          </h2>
          <Lottie animationData={otpWaiting} autoPlay loop className="h-32" />
          <div className="flex flex-col gap-3">
            <h2>Masukkan kode OTP</h2>
            <form action="">
              <div className="relativ flex justify-center h-10">
                <AuthCode
                  length={6}
                  containerClassName="flex w-fit gap-2"
                  placeholder="_"
                  inputClassName="flex rounded-md w-7 text-center font-bold h-9 md:w-9 md:h-11 drop-shadow-sm bg-gray-100"
                  allowedCharacters="numeric"
                  onChange={(e: string) => handleInputAuth(e)}
                />
              </div>
              <div className="w-full flex justify-center">
                <Button onClick={handleSubmitAuth} className="mt-8 w-52">
                  Submit
                </Button>
              </div>
            </form>
            <div>
              <Countdown key={resetCount} date={Date.now() + 60000}>
                <button
                  onClick={() => {
                    handleResendOtp(), handleResetCount();
                  }}
                  className="text-xs mt-3 font-bold"
                >
                  Kirim ulang kode
                </button>
              </Countdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
