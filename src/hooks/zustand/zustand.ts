import { create } from "zustand";

interface ISideState {
  sideBar: boolean;
  setSideBar: (setSide: boolean) => void;
}

export const useSideBarStore = create<ISideState>((set) => ({
  sideBar: false,
  setSideBar: (setSide: boolean) => set({ sideBar: setSide }),
}));

interface ISideDaftar {
  sideBar: boolean;
  setSideBar: (setSide: boolean) => void;
}

export const useSideDaftar = create<ISideDaftar>((set) => ({
  sideBar: false,
  setSideBar: (setSide: boolean) => set({ sideBar: setSide }),
}));

interface IAuthConfirm {
  hash: string;
  otp: string;
  setAuthConfirm: (setAuth: { hash: string; otp: string }) => void;
}

export const useAuthConfirmStore = create<IAuthConfirm>((set) => ({
  hash: "",
  otp: "",
  setAuthConfirm: (setAuth: { hash: string; otp: string }) =>
    set(() => ({ hash: setAuth.hash, otp: setAuth.otp })),
}));
