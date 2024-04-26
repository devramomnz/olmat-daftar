import api from "@/config/axiosConfig";
import { usePaginationProduct } from "@/hooks/pagination/usePagination";
import { useButtonLoading } from "@/hooks/zustand/useButtonLoading";
import { IPayment } from "@/interfaces/IPayments";
import { useEffect, useState } from "react";

const useTransaction = () => {
  const { paginationOptions, metaData, setMetaData, setPaginationOptions } =
    usePaginationProduct();
  const { setIsButtonLoading } = useButtonLoading();

  const [payments, setPayments] = useState<IPayment[]>([]);

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
          status: payments.status,
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
    setIsButtonLoading(false);
  }, []);

  return {
    paginationOptions,
    metaData,
    payments,
    handleChangeCurentPage,
    handleChangePageSize,
  };
};
export default useTransaction;
