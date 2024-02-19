// app/providers.tsx
"use client";

import { useLayout } from "@/hooks/zustand/layout";
import { NextUIProvider } from "@nextui-org/react";
import { ConfigProvider } from "antd";
import id_ID from "antd/lib/locale/id_ID";
import NextTopLoader from "nextjs-toploader";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  const {
    isLoading,
    isError,
    setError,
    isSuccess,
    setIsSuccess,
    isMessage,
    // setPermissions,
  } = useLayout();
  useEffect(() => {
    if (isSuccess && isMessage) {
      toast.success(isMessage);
      setIsSuccess(false, "");
    }
    if (isError && isMessage) {
      toast.error(isMessage);
      setError(false, "");
    }
    // getMe();
  }, [isSuccess, isError, isLoading]);
  return (
    <NextUIProvider>
      <NextTopLoader
        color="#7FC7D9"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        zIndex={100000}
        showSpinner={true}
        easing="ease"
      />
      <Toaster />
      <ConfigProvider locale={id_ID}>{children}</ConfigProvider>
    </NextUIProvider>
  );
}
