import api from "@/config/axiosConfig";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ICard {
  name: string;
  id: string;
  school: string;
  region: string;
}

const useIdCard = () => {
  const id = useParams().slug;

  const [card, setCard] = useState<ICard>();

  async function getParticipantById() {
    await api.get(`/participant/${id}`).then((res) => {
      const cardData = {
        name: res.data.name,
        id: res.data.id,
        school: res.data.school.name,
        region: res.data.school.city.region.name,
      };
      setCard(cardData);
    });
  }

  useEffect(() => {
    getParticipantById();
  }, []);

  return { id, card };
};
export default useIdCard;
