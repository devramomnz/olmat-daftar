import { Form } from "antd";

const useLogin = () => {
  const [form] = Form.useForm();
  return { form };
};
export default useLogin;
