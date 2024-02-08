import { Form, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import React from "react";

interface IAntSelect {
  name?: string;
  labelName?: string;
  value?: string;
  option?: DefaultOptionType[];
  onChange?: (e: string) => void;
}

export default function AntItemSelect(props: IAntSelect) {
  const { name, value, option, onChange, labelName } = props;
  return (
    <>
      <Form.Item name={name}>
        <label className="text-sm">{labelName}</label>
        <Select
          value={value}
          showSearch
          size="large"
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
          options={option || []}
          onChange={onChange}
        />
      </Form.Item>
    </>
  );
}
