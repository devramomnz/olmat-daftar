import api from "@/config/axiosConfig";
import { useEffect, useState } from "react";

interface IDashboard {
  total_participant_success: string;
  total_participant_cancel: string;
  payment_pending_lists: any[];
}

const useUser = () => {
  const [dashboard, setDashboard] = useState<IDashboard>({
    total_participant_success: "0",
    total_participant_cancel: "0",
    payment_pending_lists: [],
  });

  async function getDasboardData() {
    await api.get("/dashboard").then((res) => {
      setDashboard(res.data);
    });
  }

  useEffect(() => {
    getDasboardData();
  }, []);

  return { dashboard };
};
export default useUser;
