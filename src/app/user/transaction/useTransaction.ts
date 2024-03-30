import api from "@/config/axiosConfig";
import { IPayment } from "@/interfaces/IPayments";
import { useEffect, useState } from "react";

const useTransaction = () => {
  const [payments, setPayments] = useState<IPayment[]>([]);

  async function getPayments() {
    await api.get(`/payment?page=1&limit=10`).then((res) => {
      const dataPayments = res.data.data.map((payments: any) => ({
        id: payments.id,
        invoice: payments.invoice,
        code: payments.code,
        amount: payments.amount,
        totalAmount: payments.total_amount,
        participantAmount: payments.participant_amounts,
        status: payments.status,
      }));
      setPayments(dataPayments);
    });
  }

  useEffect(() => {
    getPayments();
  }, []);

  return { payments };
};
export default useTransaction;
