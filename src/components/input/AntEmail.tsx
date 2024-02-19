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
  require?: NodeRequire;
}

export function AntEmail(props: IEmailInputProps) {
  const { name, labelName, value, onChange, placeholder, className } = props;
  const emailValidator: Rule[] = [
    {
      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Invalid email address",
    },
    {
      required: true,
      message: `${labelName} diperlukan`,
    },
  ];

  return (
    <div>
      <label className="text-sm">{labelName}</label>
      <Form.Item name={name} rules={emailValidator} hasFeedback>
        <Input
          variant="filled"
          value={value}
          name={name}
          onChange={onChange}
          placeholder={labelName ? `masukkan ${labelName}` : placeholder}
          className={`${className} text-sm hover:border-brand-muted focus:border-brand`}
        />
      </Form.Item>
    </div>
  );
}

export default AntEmail;
