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
