import api from "@/config/axiosConfig";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";

interface ICard {
  name: string;
  img: string;
  id: string;
  school: string;
  region: string;
}

const useIdCard = () => {
  const idCardPdf = useRef<any>(null);
  const id = useParams().slug;

  const [card, setCard] = useState<ICard>();

  async function getParticipantById() {
    await api.get(`/participant/${id}`).then((res) => {
      console.log(res.data);
      const cardData = {
        img: res.data.img,
        name: res.data.name,
        id: res.data.id,
        school: res.data.school.name,
        region: res.data.school.city.region.name,
      };
      setCard(cardData);
    });
  }

  function downloadPdf() {
    const element = idCardPdf.current;
    if (!element) {
      console.error("Element not found");
      return;
    }

    const pdf = new jsPDF("portrait", "pt", "b6");
    const { offsetWidth, offsetHeight } = element;

    pdf.html(element, {
      callback: () => {
        pdf.save("idCard.pdf");
      },
      html2canvas: {
        scale: 2,
        width: offsetWidth,
        height: offsetHeight,
      },
    });
  }

  useEffect(() => {
    getParticipantById();
  }, [id]);

  return { id, card, idCardPdf, downloadPdf };
};
export default useIdCard;
