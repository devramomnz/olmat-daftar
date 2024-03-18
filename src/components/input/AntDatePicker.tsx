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
  require?: boolean;
}

export default function AntDatePicker(props: IAntSelect) {
  const { name, require, placeholder, onChange, labelName } = props;
  const dateFormat = "YYYY/MM/DD";
  moment.tz.setDefault("Asia/Jakarta");
  return (
    <div>
      <label className="text-sm">{labelName}</label>
      <Form.Item
        name={name}
        className=""
        rules={[
          {
            required: require !== undefined,
            message: `Please input ${labelName}!`,
          },
        ]}
      >
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
