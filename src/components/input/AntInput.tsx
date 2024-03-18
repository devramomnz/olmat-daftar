import { Form, Input } from "antd";
import React, { ChangeEvent } from "react";

interface IAntInput {
  name?: string;
  prefix?: string;
  labelName?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  require?: boolean;
}

export default function AntInput(props: IAntInput) {
  const {
    name,
    labelName,
    value,
    defaultValue,
    onChange,
    disabled,
    prefix,
    placeholder,
    className,
    require,
  } = props;

  return (
    <div className="h-fit ">
      <label className="text-sm">{labelName}</label>
      <Form.Item
        name={name}
        rules={[
          {
            required: require !== undefined,
            message: `Please input ${labelName}!`,
          },
        ]}
      >
        <Input
          disabled={disabled}
          name={name}
          size="middle"
          prefix={prefix}
          value={value}
          defaultValue={defaultValue}
          placeholder={labelName ? `masukkan ${labelName}` : placeholder}
          onChange={onChange}
          variant="borderless"
          className={`${className} active:bg-gray-100 focus:bg-gray-100 hover:bg-gray-100 bg-gray-100 rounded-full `}
        />
      </Form.Item>
    </div>
  );
}

// <Input
//   name={name}
//   variant="filled"
//   value={value}
//   defaultValue={defaultValue}
//   placeholder={`masukkan ${labelName} `}
//   onChange={onChange}
//   className={`${className} p-2 hover:border-brand-muted focus:border-brand`}
// />
