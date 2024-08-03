import api from "@/config/axiosConfig";
import { PaymentStatus } from "@/enum/payment.enum";
import { useLayout } from "@/hooks/zustand/layout";
import { ROUTES } from "@/prefix/routes";
import { decryptString, encryptString } from "@/utils/encrypt";
import { useParams, useRouter } from "next/navigation";
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
  const { setError, setIsSuccess } = useLayout();
  const router = useRouter();
  const [isModal, setIsModal] = useState(false);

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

  async function getNewPayment() {
    await api
      .post("/participant/regenerate-payment", {
        oldPaymentId: paymentId,
        paymentCode: "QRIS",
      })
      .then((res) => {
        res.data.payment.id;
        setIsSuccess(true, "Berhasil membuat pembayaran baru");
        router.push(
          ROUTES.TRANSACTION + "/" + encryptString(`${res.data.payment.id}`)
        );
        // setTimeout(() => {

        // }, 2000); // 2000 milidetik = 2 detik
      })
      .catch(() => {
        setError(true, "Gagal membuat pembayaran baru");
      });
  }

  /**
   * HANDLE
   */

  function handleGetNewPayments() {
    getNewPayment();
  }

  useEffect(() => {
    getPaymentById();
  }, []);

  return {
    paymentData,
    payStatus,
    isModal,
    setIsModal,
    handleGetNewPayments,
  };
};
export default usePayment;
