import api from "@/config/axiosConfig";
import { PaymentStatus } from "@/enum/payment.enum";
import { decryptString } from "@/utils/encrypt";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IParticipant {
  name: string;
  gender: string;
  birth: string;
}
export interface IPaymentData {
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
  participants: IParticipant[];
}

const usePayment = () => {
  const params = useParams().slug.toString();
  const decodedSlug = decodeURIComponent(params);
  const paymentId = decryptString(decodedSlug);

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
    participants: [],
  });

  const [payStatus, setPayStatus] = useState<string>("");
  const nowDate = new Date();

  async function getPaymentById() {
    await api.get(`/payment/${paymentId}`).then((res) => {
      const exp = new Date(res.data.expired_at);
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
        participants: res.data.participants,
      };
      setPaymentData(resData);
      if (res.data.status !== PaymentStatus.PAID && nowDate <= exp) {
        setPayStatus(PaymentStatus.PENDING);
      }
      if (res.data.status === PaymentStatus.PENDING && nowDate >= exp) {
        setPayStatus(PaymentStatus.EXPIRED);
      }
      if (res.data.status === PaymentStatus.PAID) {
        setPayStatus(PaymentStatus.PAID);
      }
    });
  }

  useEffect(() => {
    getPaymentById();
  }, []);

  return { paymentData, payStatus };
};
export default usePayment;
