"use client";

import { DatePicker, Form } from "antd";
import locale from "antd/es/date-picker/locale/id_ID";
import React, { ChangeEvent } from "react";
import "dayjs/locale/id";
import dayjs from "dayjs";

interface IAntSelect {
  name?: string;
  labelName?: string;
  placeholder?: string;
  value?: any;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function AntDatePicker(props: IAntSelect) {
  const { name, placeholder, onChange, labelName } = props;
  const dateFormat = "DD-MM-YYYY";

  dayjs.locale("id");
  return (
    <div>
      <label className="text-sm">{labelName}</label>
      <Form.Item name={name} className="">
        {/* <ConfigProvider locale={locale}> */}
        <DatePicker
          lang="id"
          locale={locale}
          format={dateFormat}
          onChange={onChange}
          //  needConfirm
          variant="filled"
          placeholder={labelName ? `masukkan ${labelName}` : placeholder}
          className="w-full"
        />
        {/* </ConfigProvider> */}
      </Form.Item>
    </div>
  );
}
