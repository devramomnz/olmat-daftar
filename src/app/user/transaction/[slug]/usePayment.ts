import api from "@/config/axiosConfig";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface IPaymentData {
  invoice: string;
  code: string;
  paymentId: string;
  qrString: string;
  participantAmount: number;
  fee: number;
  amount: number;
  totalAmount: number;
  expiredDate: string;
  status: string;
}

const usePayment = () => {
  const slug = usePathname().split("/")[3];

  const [paymentData, setPaymentData] = useState<IPaymentData>({
    invoice: "",
    code: "",
    paymentId: "",
    qrString: "",
    participantAmount: 0,
    fee: 0,
    amount: 0,
    totalAmount: 0,
    expiredDate: "",
    status: "",
  });
  console.log(paymentData);

  async function getPaymentById() {
    await api.get(`/payment/${slug}`).then((res) => {
      const resData = {
        invoice: res.data.invoice,
        code: res.data.code,
        paymentId: res.data.action.id,
        qrString: res.data.action.qr_string,
        participantAmount: res.data.participant_amounts,
        fee: res.data.fee,
        amount: res.data.amount,
        totalAmount: res.data.total_amount,
        expiredDate: res.data.expired_at,
        status: res.data.status,
      };
      setPaymentData(resData);
    });
  }

  useEffect(() => {
    getPaymentById();
  }, []);

  return { paymentData };
};
export default usePayment;
