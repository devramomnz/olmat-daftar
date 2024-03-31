import api from "@/config/axiosConfig";
import { IParticipant } from "@/interfaces/IParticipant";
import { useEffect, useState } from "react";

const useParticipant = () => {
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
    await api.get(`/participant?page=1&limit=10`).then((res) => {
      setParticipant(res.data.data);
    });
  }

  useEffect(() => {
    getParticipants();
  }, []);

  return { participant };
};

export default useParticipant;
