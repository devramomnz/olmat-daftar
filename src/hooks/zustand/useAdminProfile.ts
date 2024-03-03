import { create } from "zustand";

interface IAdminProfile {
  name: string;
  email?: string;
  phone?: string;
  schoolId?: number;
  schoolName?: string;
  degreeId?: number;
  degreeName?: string;
  setAdminProfile: (setAdmin: {
    name: string;
    email?: string;
    phone?: string;
    schoolName?: string;
    schoolId?: number;
    degreeName?: string;
    degreeId?: number;
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

  setAdminProfile: (setAdmin: {
    name: string;
    email?: string;
    phone?: string;
    schoolId?: number;
    schoolName?: string;
    degreeId?: number;
    degreeName?: string;
  }) =>
    set({
      name: setAdmin.name,
      email: setAdmin.email,
      phone: setAdmin.phone,
      schoolId: setAdmin.schoolId,
      schoolName: setAdmin.schoolName,
      degreeId: setAdmin.degreeId,
      degreeName: setAdmin.degreeName,
    }),
}));
