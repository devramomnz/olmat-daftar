import { create } from "zustand";

export const useAuthVerif = create<{
  hash: string;
  authEmail: string;
  setAuth: (value: { hash: string; authEmail: string }) => void;
}>((set) => ({
  hash: "",
  authEmail: "",
  setAuth: (value) =>
    set(() => ({
      hash: value.hash,
      authEmail: value.authEmail,
    })),
}));
