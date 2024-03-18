import React, { ChangeEvent } from "react";
import { Form, Input } from "antd";
import { Rule } from "antd/lib/form";

interface IEmailInputProps {
  name?: string;
  labelName?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  require?: boolean;
}

export function AntEmail(props: IEmailInputProps) {
  const { name, labelName, value, onChange, require, placeholder, className } =
    props;
  const emailValidator: Rule[] = [
    {
      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Invalid email address",
    },
    {
      required: require !== undefined,
      message: `Please input ${labelName}!`,
    },
  ];

  return (
    <div>
      <label className="text-sm">{labelName}</label>
      <Form.Item name={name} rules={emailValidator}>
        <Input
          value={value}
          name={name}
          variant="borderless"
          onChange={onChange}
          placeholder={labelName ? `masukkan ${labelName}` : placeholder}
          // className={`${className} text-sm hover:border-brand-muted focus:border-brand`}
          className={`${className} active:bg-gray-100 focus:bg-gray-100 hover:bg-gray-100 bg-gray-100 rounded-full `}
        />
      </Form.Item>
    </div>
  );
}

export default AntEmail;
