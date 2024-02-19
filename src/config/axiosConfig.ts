import axios from "axios";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Jakarta");

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST_API,
});

export default api;
