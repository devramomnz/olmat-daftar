import api from "@/config/axiosConfig";
import { PaymentStatus } from "@/enum/payment.enum";
import { usePaginationProduct } from "@/hooks/pagination/usePagination";
import { IPayment } from "@/interfaces/IPayments";
import { useEffect, useState } from "react";

const useTransaction = () => {
  const { paginationOptions, metaData, setMetaData, setPaginationOptions } =
    usePaginationProduct();
  const nowDate = new Date();

  const [payments, setPayments] = useState<IPayment[]>([]);

  function statusFunction(res: any) {
    if (
      res.status !== PaymentStatus.PAID &&
      nowDate <= new Date(res.expired_at)
    ) {
      return PaymentStatus.PENDING;
    }
    if (
      res.status === PaymentStatus.PENDING &&
      nowDate >= new Date(res.expired_at)
    ) {
      return PaymentStatus.EXPIRED;
    }
    if (res.status === PaymentStatus.PAID) {
      return PaymentStatus.PAID;
    }
  }

  async function getPayments() {
    await api
      .get(
        `/payment?page=${paginationOptions.curentPage}&limit=${paginationOptions.pageSize}`
      )
      .then((res) => {
        const dataPayments = res.data.data.map((payments: any) => ({
          id: payments.id,
          invoice: payments.invoice,
          code: payments.code,
          amount: payments.amount,
          totalAmount: payments.total_amount,
          participantAmount: payments.participant_amounts,
          status: statusFunction(payments),
        }));
        setPayments(dataPayments);
        setMetaData(res.data.metadata);
      });
  }

  /**
   * HANDLE CHANGE
   */

  function handleChangePageSize(pageSizeParam: number) {
    if (pageSizeParam != paginationOptions.pageSize) {
      setPaginationOptions({ ...paginationOptions, pageSize: pageSizeParam });
    }
  }

  function handleChangeCurentPage(curentPageParam: number) {
    if (curentPageParam != paginationOptions.curentPage) {
      setPaginationOptions({
        ...paginationOptions,
        curentPage: curentPageParam,
      });
    }
  }

  useEffect(() => {
    getPayments();
    // setIsButtonLoading(false);
  }, [paginationOptions.curentPage, paginationOptions.pageSize]);

  return {
    paginationOptions,
    metaData,
    payments,
    handleChangeCurentPage,
    handleChangePageSize,
  };
};
export default useTransaction;
