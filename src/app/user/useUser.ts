import api from "@/config/axiosConfig";
import { useEffect, useState } from "react";

interface IDashboard {
  succesParticipant: string;
  cancelParticipant: string;
  pendingPayment: any[];
  eventName: string;
  eventStart: string;
  eventEnd: string;
}

const useUser = () => {
  const [dashboard, setDashboard] = useState<IDashboard>({
    succesParticipant: "0",
    cancelParticipant: "0",
    pendingPayment: [],
    eventName: "",
    eventStart: "",
    eventEnd: "",
  });

  async function getDasboardData() {
    await api.get("/dashboard").then((res) => {
      console.log(res.data);
      setDashboard({
        ...dashboard,
        succesParticipant: res.data.total_participant_success,
        cancelParticipant: res.data.total_participant_cancel,
        pendingPayment: res.data.payment_pending_lists,
        eventName: res.data.event_setting[0].name,
        eventStart: res.data.event_setting[0].start,
        eventEnd: res.data.event_setting[0].end,
      });
    });
  }

  useEffect(() => {
    getDasboardData();
  }, []);

  return { dashboard };
};
export default useUser;
