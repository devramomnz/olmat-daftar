import api from "@/config/axiosConfig";
import { IParticipant } from "@/interfaces/IParticipant";
import { useEffect, useState } from "react";

const useParticipant = () => {
  const [participant, setParticipant] = useState<IParticipant[]>([
    {
      name: "",
      gender: "",
      birth: "",
      degree: "",
      status: "",
      img: [],
      attachment: [],
    },
  ]);

  async function getParticipants() {
    await api.get(`/participant?page=1&limit=10`).then((res) => {
      console.log(res.data.data);
      setParticipant(res.data.data);
    });
  }

  useEffect(() => {
    getParticipants();
  }, []);

  return { participant };
};

export default useParticipant;
