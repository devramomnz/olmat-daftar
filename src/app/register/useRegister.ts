import { Form } from "antd";

const useRegister = () => {
  const [form] = Form.useForm();
  return { form };
};
export default useRegister;
