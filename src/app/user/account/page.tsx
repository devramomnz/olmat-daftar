"use client";

import Button from "@/components/button/Button";
import EditButton from "@/components/button/EditButton";
import AntEmail from "@/components/input/AntEmail";
import AntInput from "@/components/input/AntInput";
import { Form } from "antd";
import React from "react";
import useAccount from "./useAccount";
import { PiLockKeyOpenFill } from "react-icons/pi";
import AppModal from "@/components/modal/AppModal";
import AntPass from "@/components/input/AntPass";

export default function Account() {
  const {
    form,
    formPass,
    isEdit,
    isChangePass,
    handleCancelEdit,
    handleEdit,
    handleChangePass,
    setIsChangePass,
    handleInputChange,
    handleInputChangePassword,
    handleCancelChangePass,
    handleSubmitPass,
    handleSubmitAccount,
  } = useAccount();
  return (
    <>
      <AppModal
        title="Ubah Password"
        open={isChangePass}
        setOpen={() => {
          setIsChangePass(false);
          handleCancelChangePass();
        }}
      >
        <Form form={formPass} onFinish={handleSubmitPass}>
          <AntPass
            onChange={handleInputChangePassword}
            labelName="Password Lama"
            name="currentPassword"
          />
          <AntPass labelName="Password Baru" name="passwordd" />
          <AntPass
            form={formPass}
            onChange={handleInputChangePassword}
            labelName="Konfirmasi Password Baru"
            dependencies={["passwordd"]}
            name="password"
          />
        </Form>
        <div className="flex items-center justify-center mb-5">
          <Button onClick={handleSubmitPass}>Simpan</Button>
        </div>
      </AppModal>
      <div className="w-full p-4 bg-white mt-5 rounded-md drop-shadow-md flex flex-col gap-2">
        <div className="flex border-b pb-2 justify-between items-center">
          <label className="font-bold">Pengaturan Akun</label>
          <EditButton
            onCancel={handleCancelEdit}
            onEdit={handleEdit}
            state={isEdit}
          />
        </div>
        <Form
          form={form}
          onFinish={handleSubmitAccount}
          className=" flex flex-col justify-center pt-3 text-black "
        >
          <div className="md:grid-cols-3 gap-5 grid">
            <AntInput
              disabled={!isEdit}
              labelName="Nama"
              className="text-black"
              name="name"
              onChange={handleInputChange}
            />
            <AntInput
              onChange={handleInputChange}
              disabled={!isEdit}
              labelName="No. Telepon"
              name="phone"
            />
            <AntEmail
              onChange={handleInputChange}
              disabled={!isEdit}
              labelName="Email"
              name="email"
            />
          </div>

          {isEdit && (
            <div className="flex justify-center">
              <Button onClick={handleSubmitAccount} className="w-fit">
                Sumbit
              </Button>
            </div>
          )}
        </Form>
        {!isEdit && (
          <div className="flex justify-center">
            <span
              onClick={handleChangePass}
              className="px-3 w-fit bg-brand-dark rounded-full flex items-center gap-1 text-white"
            >
              <PiLockKeyOpenFill />
              <p>Ubah Password</p>
            </span>
          </div>
        )}
      </div>
    </>
  );
}
