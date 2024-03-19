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
  require?: NodeRequire;
  form?: any;
  dependencies?: string[];
}

export default function AntPass(props: IAntInput) {
  const {
    form,
    name,
    labelName,
    value,
    defaultValue,
    onChange,
    dependencies,
    placeholder,
    className,
  } = props;

  const validationRules: any[] = [
    {
      required: true,
      message: `${labelName} minimal 8 karakter`,
      min: 8,
    },
  ];

  if (dependencies && dependencies.length > 0) {
    validationRules.push({
      validator: (_: any, value: any) => {
        const [dependency] = dependencies;
        const dependentValue = form.getFieldValue(dependency);
        if (!value || dependentValue === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("Konfirmasi kata sandi tidak sama"));
      },
    });
  }

  return (
    <div>
      <label className="text-sm">{labelName}</label>
      <Form.Item
        name={name}
        dependencies={dependencies}
        rules={validationRules}
      >
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
          className={`${className} active:bg-gray-100 focus:bg-gray-100 hover:bg-gray-100 bg-gray-100 rounded-full `}
        />
      </Form.Item>
    </div>
  );
}
