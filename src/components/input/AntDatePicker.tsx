import { DatePicker, Form } from "antd";
import locale from "antd/es/date-picker/locale/id_ID";
import moment from "moment-timezone";
import React, { ChangeEvent } from "react";

interface IAntSelect {
  name?: string;
  labelName?: string;
  placeholder?: string;
  value?: any;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function AntDatePicker(props: IAntSelect) {
  const { name, placeholder, onChange, labelName } = props;
  const dateFormat = "DD/MM/YYYY";
  moment.tz.setDefault("Asia/Jakarta");
  return (
    <div>
      <label className="text-sm">{labelName}</label>
      <Form.Item name={name} className="">
        <DatePicker
          //  value={value}
          //  lang="en"
          locale={locale}
          format={dateFormat}
          onChange={onChange}
          //  needConfirm
          variant="filled"
          placeholder={labelName ? `masukkan ${labelName}` : placeholder}
          className="w-full"
        />
      </Form.Item>
    </div>
  );
}
