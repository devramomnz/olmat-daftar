import { Form, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import React from "react";

interface IAntSelect {
  name?: string;
  labelName?: string;
  value?: any;
  option?: DefaultOptionType[];
  onChange?: (e: DefaultOptionType) => void;
}

export default function AntItemSelect(props: IAntSelect) {
  const { name, value, option, onChange, labelName } = props;
  return (
    <div>
      <label className="text-sm">{labelName}</label>
      <Form.Item
        rules={[
          {
            required: true,
            message: `Pilih ${labelName}`,
          },
        ]}
        hasFeedback
        name={name}
      >
        <Select
          variant="filled"
          value={value}
          showSearch
          size="middle"
          style={{ width: "100%" }}
          placeholder={`Pilih ${labelName}`}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label as string)
              .toLowerCase()
              .localeCompare((optionB?.label as string).toLowerCase())
          }
          options={option}
          onChange={onChange}
        />
      </Form.Item>
    </div>
  );
}
