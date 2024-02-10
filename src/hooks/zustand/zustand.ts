import { create } from "zustand";

interface ISideState {
  sideBar: boolean;
  setSideBar: (setSide: boolean) => void;
}

export interface ILeaderRef {
  refCode: string | undefined;
  setRefCode: (setRef: string) => void;
  leadName: string;
  setLeadName: (setName: string) => void;
  membershipStatus: boolean;
  setMembershipStatus: (setStatus: boolean) => void;
}

export const useSideBarStore = create<ISideState>((set) => ({
  sideBar: false,
  setSideBar: (setSide: boolean) => set({ sideBar: setSide }),
}));

export const useLeader = create<ILeaderRef>((set) => ({
  refCode: "",
  setRefCode: (setRef: string) => set({ refCode: setRef }),
  leadName: "",
  setLeadName: (setName: string) => set({ leadName: setName }),
  membershipStatus: false,
  setMembershipStatus: (setStatus: boolean) =>
    set({ membershipStatus: setStatus }),
}));
