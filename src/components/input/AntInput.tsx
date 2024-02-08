import { Form, Input } from "antd";
import React, { ChangeEvent } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

interface IAntInput {
  name?: string;
  labelName?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  textArea?: boolean;
  password?: boolean;
  require?: NodeRequire;
}

const { TextArea } = Input;

export default function AntInput(props: IAntInput) {
  const {
    textArea,
    name,
    labelName,
    value,
    defaultValue,
    onChange,
    placeholder,
    className,
    require,
    password,
  } = props;

  return (
    <>
      <label className="text-sm">{labelName}</label>
      <Form.Item
        name={name}
        rules={[
          {
            required: require !== undefined,
            message: `Please input ${labelName}!`,
          },
        ]}
        hasFeedback
      >
        {textArea === true ? (
          <TextArea
            size="middle"
            name={name}
            defaultValue={defaultValue}
            placeholder={labelName ? `masukkan ${labelName}` : placeholder}
            onChange={onChange}
            className={`${className} p-2 hover:border-brand-muted focus:border-brand`}
          />
        ) : password ? (
          <Input.Password
            size="middle"
            name={name}
            variant="filled"
            value={value}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            defaultValue={defaultValue}
            placeholder={labelName ? `masukkan ${labelName}` : placeholder}
            onChange={onChange}
            className={`${className} hover:border-brand-muted focus:border-brand`}
          />
        ) : (
          <Input
            size="middle"
            value={value}
            variant="filled"
            defaultValue={defaultValue}
            placeholder={labelName ? `masukkan ${labelName}` : placeholder}
            onChange={onChange}
            className={`${className} hover:border-brand-muted focus:border-brand`}
          />
        )}
      </Form.Item>
    </>
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
