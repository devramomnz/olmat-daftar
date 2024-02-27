import { IPeserta } from "@/interfaces/IPeserta";
import { create } from "zustand";

interface IDataPayment {
  participantDataPay: IPeserta[];
  setParticipantDataPay: (setData: { value: IPeserta[] }) => void;
}

export const useParticipantPay = create<IDataPayment>((set) => ({
  participantDataPay: [],
  setParticipantDataPay: (setData: { value: IPeserta[] }) =>
    set({ participantDataPay: setData.value }),
}));
