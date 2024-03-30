"use client";

import React, { ReactNode, useEffect, useState } from "react";
import TopNavDaftar from "./components/TopNavDaftar";
import { useRouter } from "next/navigation";
import api from "@/config/axiosConfig";
import dayjs from "dayjs";

interface ILayout {
  children: ReactNode;
}

interface IEventDate {
  start: string;
  end: string;
}

export default function UserLayout(props: ILayout) {
  const router = useRouter();
  const { children } = props;
  const [eventDate, setEventDate] = useState<IEventDate>();

  console.log(eventDate);

  async function getEventDate() {
    await api.get("/event-setting").then((res) => {
      setEventDate(res.data[0]);
      const now = dayjs(new Date());
      const startDate = dayjs(res.data[0].start);
      const endDate = dayjs(res.data[0].end);
      const job = now < endDate && now > startDate;
      if (!job) {
        router.push("/user");
      }
    });
  }

  useEffect(() => {
    getEventDate();
  }, []);

  return (
    <>
      <div>
        <TopNavDaftar />
        <div className="mt-14 min-h-screen bg-gray-100 ">
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
