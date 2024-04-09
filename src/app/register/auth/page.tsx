"use client";

import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import otpMail from "@/assets/lottie/otpMail.json";
import otpWaiting from "@/assets/lottie/otpWaiting.json";
import AuthCode from "react-auth-code-input";
import useAuthConfirm from "./useAuthConfirm";
import { Form } from "antd";

export default function Auth() {
  const { authEmail, handleInputAuth, handleResendOtp, handleSubmitAuth } =
    useAuthConfirm();
  const [show, setShow] = useState(false);
  const [isCountdown, setIsCountdown] = useState(60);
  const timeId: any = useRef();

  useEffect(() => {
    timeId.current = setInterval(() => {
      setIsCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timeId.current);
  }, []);
  useEffect(() => {
    // getMe();
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
            <Form onFinish={handleSubmitAuth}>
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
                <button className="mt-8 w-52 px-5 bg-brand py-1 rounded-xl drop-shadow font-bold">
                  Submit
                </button>
              </div>
            </Form>
            <div className="mt-3">
              {isCountdown <= 0 ? (
                <span
                  className="text-sm cursor-pointer font-bold transition-all duration-300 hover:text-brand"
                  onClick={() => {
                    handleResendOtp();
                    setIsCountdown(60);
                  }}
                >
                  Kirim Ulang Kode
                </span>
              ) : (
                <p>
                  <span className="mx-1 font-bold">
                    {isCountdown} {" Detik"}
                  </span>
                </p>
              )}
              {/* <Countdown key={resetCount} date={Date.now() + 60000}>
                <span
                  onClick={() => {
                    handleResendOtp(), handleResetCount();
                  }}
                  className="text-xs mt-3 font-bold"
                >
                  Kirim ulang kode
                </span>
              </Countdown> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
