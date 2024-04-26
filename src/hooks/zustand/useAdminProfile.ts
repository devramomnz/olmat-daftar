import { create } from "zustand";

interface IAdminProfile {
  name: string;
  email?: string;
  phone?: string;
  type?: string;
  regionId?: string;
  schoolId?: number;
  schoolName?: string;
  degreeId?: number;
  registerPrice?: number;
  degreeName?: string;
  setAdminProfile: (setAdmin: {
    name?: string;
    email?: string;
    phone?: string;
    type?: string;
    regionId?: string;
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
  type: "",
  regionId: "",
  schoolId: 0,
  degreeId: 0,
  schoolName: "",
  degreeName: "",
  registerPrice: 0,

  setAdminProfile: (setAdmin: {
    name?: string;
    email?: string;
    phone?: string;
    type?: string;
    regionId?: string;
    schoolId?: number;
    schoolName?: string;
    degreeId?: number;
    degreeName?: string;
    registerPrice?: number;
  }) =>
    set((prev) => ({
      ...prev,
      name: setAdmin.name !== undefined ? setAdmin.name : prev.name,
      email: setAdmin.email !== undefined ? setAdmin.email : prev.email,
      phone: setAdmin.phone !== undefined ? setAdmin.phone : prev.phone,
      type: setAdmin.type !== undefined ? setAdmin.type : prev.type,
      regionId:
        setAdmin.regionId !== undefined ? setAdmin.regionId : prev.regionId,
      schoolId:
        setAdmin.schoolId !== undefined ? setAdmin.schoolId : prev.schoolId,
      schoolName:
        setAdmin.schoolName !== undefined
          ? setAdmin.schoolName
          : prev.schoolName,
      degreeId:
        setAdmin.degreeId !== undefined ? setAdmin.degreeId : prev.degreeId,
      degreeName:
        setAdmin.degreeName !== undefined
          ? setAdmin.degreeName
          : prev.degreeName,
      registerPrice:
        setAdmin.registerPrice !== undefined
          ? setAdmin.registerPrice
          : prev.registerPrice,
    })),
}));
