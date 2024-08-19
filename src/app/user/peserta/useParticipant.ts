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
      school_name: "",
      region: "",
      img: [],
      attachment: [],
    },
  ]);

  async function getParticipants() {
    await api
      .get(
        `/participant/admin?page=${paginationOptions.curentPage}&limit=${paginationOptions.pageSize}`
      )
      .then((res) => {
        const participants = res.data.data.map((data: any) => ({
          img: data.img,
          name: data.name,
          gender: data.gender,
          birth: data.birth,
          status: data.status,
          id: data.id,
          school_name: data.school.name,
          region: data.school.city.region.name,
        }));
        setParticipant(participants);
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
  }, [paginationOptions.curentPage, paginationOptions.pageSize]);

  return {
    metaData,
    paginationOptions,
    participant,
    handleChangeCurentPage,
    handleChangePageSize,
  };
};

export default useParticipant;
