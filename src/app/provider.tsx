// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ConfigProvider } from "antd";
import id_ID from "antd/lib/locale/id_ID";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ConfigProvider locale={id_ID}>{children}</ConfigProvider>
    </NextUIProvider>
  );
}
