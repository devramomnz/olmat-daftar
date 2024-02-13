import { Form } from "antd";

const useRegisterSchool = () => {
  const [form] = Form.useForm();
  return { form };
};
export default useRegisterSchool;
