import Image from "next/image";
import React from "react";

interface IAppImage {
  src: any;
  className: string;
  alt: string;
}

export default function AppImage(props: IAppImage) {
  const { src, className, alt } = props;
  return (
    <div className={`${className} relative`}>
      <Image src={src} alt={alt} fill />
    </div>
  );
}
