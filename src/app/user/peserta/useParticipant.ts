import api from "@/config/axiosConfig";
import { usePaginationProduct } from "@/hooks/pagination/usePagination";
import { IParticipant } from "@/interfaces/IParticipant";
import { useEffect, useState } from "react";

const useParticipant = () => {
  const { paginationOptions, metaData, setMetaData, setPaginationOptions } =
    usePaginationProduct();

  const [participant, setParticipant] = useState<IParticipant[]>([
    {
      name: "",
      gender: "",
      birth: "",
      status: "",
      img: [],
      attachment: [],
    },
  ]);

  async function getParticipants() {
    await api
      .get(
        `/participant?page=${paginationOptions.curentPage}&limit=${paginationOptions.pageSize}`
      )
      .then((res) => {
        setParticipant(res.data.data);
        setMetaData(res.data.metadata);
      });
  }

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
    getParticipants();
  }, []);

  return {
    metaData,
    paginationOptions,
    participant,
    handleChangeCurentPage,
    handleChangePageSize,
  };
};

export default useParticipant;
