import { useButtonLoading } from "@/hooks/zustand/useButtonLoading";
import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  variant?: "second";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}
export default function Button(props: IProps) {
  const { children, variant, className, onClick, disabled } = props;
  const { isButtonLoading } = useButtonLoading();

  return (
    <button
      disabled={disabled ? disabled : isButtonLoading}
      onClick={onClick}
      className={`${className} rounded-lg ${
        variant == "second"
          ? "from-slate-200 to-stone-50 text-black bg-gradient-to-r"
          : " bg-brand text-white"
      }  px-6 py-[0.30rem] text-sm font-semibold hover:shadow-lg`}
    >
      {isButtonLoading ? "Loading..." : children}
    </button>
  );
}
