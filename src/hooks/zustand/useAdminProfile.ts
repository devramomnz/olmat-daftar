import { create } from "zustand";

interface IAdminProfile {
  name: string;
  email?: string;
  phone?: string;
  schoolId?: number;
  schoolName?: string;
  degreeId?: number;
  registerPrice?: number;
  degreeName?: string;
  setAdminProfile: (setAdmin: {
    name: string;
    email?: string;
    phone?: string;
    schoolName?: string;
    schoolId?: number;
    degreeName?: string;
    degreeId?: number;
    registerPrice?: number;
  }) => void;
}

export const useAdminProfile = create<IAdminProfile>((set) => ({
  name: "",
  email: "",
  phone: "",
  schoolId: 0,
  degreeId: 0,
  schoolName: "",
  degreeName: "",
  registerPrice: 0,

  setAdminProfile: (setAdmin: {
    name: string;
    email?: string;
    phone?: string;
    schoolId?: number;
    schoolName?: string;
    degreeId?: number;
    degreeName?: string;
    registerPrice?: number;
  }) =>
    set({
      name: setAdmin.name,
      email: setAdmin.email,
      phone: setAdmin.phone,
      schoolId: setAdmin.schoolId,
      schoolName: setAdmin.schoolName,
      degreeId: setAdmin.degreeId,
      degreeName: setAdmin.degreeName,
      registerPrice: setAdmin.registerPrice,
    }),
}));
