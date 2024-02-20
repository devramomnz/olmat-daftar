import { create } from "zustand";

interface IAdminProfile {
  name: string;
  // permissions: string[];
  setAdminProfile: (setAdmin: { name: string }) => void;
}

export const useAdminProfile = create<IAdminProfile>((set) => ({
  name: "",
  // permissions: [],
  setAdminProfile: (setAdmin: { name: string }) => set({ name: setAdmin.name }),
}));
