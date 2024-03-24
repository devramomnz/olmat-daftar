export interface IParticipant {
  id?: number;
  payment_id?: number;
  school_id?: number;
  name: string;
  gender: string;
  birth: string;
  degree?: string;
  status?: string;
  phone?: string;
  email?: string;
  img: any[];
  attachment: any[];
}
