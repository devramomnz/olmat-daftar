import { create } from "zustand";

interface IParticipants {
  name: string;
  gender: string;
  birth: string;
}

interface IDataPayment {
  participantData: IParticipants[];
  invoice: string;
  qrString: string;
  participantAmount: number;
  payAmount: number;
  expired: string;
  setPayData: (setData: {
    value: IParticipants;
    invoice: string;
    qrString: string;
    participantAmount: number;
    payAmount: number;
    expired: string;
  }) => void;
}

export const useParticipantPay = create<IDataPayment>((set) => ({
  invoice: "",
  qrString: "",
  participantAmount: 0,
  payAmount: 0,
  participantData: [],
  expired: "",

  setPayData: (setData) =>
    set({
      participantData: [setData.value],
      invoice: setData.invoice,
      participantAmount: setData.participantAmount,
      payAmount: setData.payAmount,
      qrString: setData.qrString,
      expired: setData.expired,
    }),
}));
