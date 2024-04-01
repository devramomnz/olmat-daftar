import Image from "next/image";
import React, { useRef, useState } from "react";
import { FiEdit3 } from "react-icons/fi";

interface IProps {
  onChange: (e: any) => void;
  file?: any[];
  className?: string;
}

export default function ImgUpload(props: IProps) {
  const { onChange, file, className } = props;
  const [isDrag, setIsDrag] = useState(false);
  const [isStyle, setIsStyle] = useState("bg-gray-100");
  const buttonUpload = useRef<any>();

  let ImgPreviewUrl = "";
  if (file && file.length > 0) {
    const firstFile = file[0];
    ImgPreviewUrl = URL.createObjectURL(firstFile);
  }

  console.log(file);

  function handleDrag(e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDrag(true);
      setIsStyle("scale-110 relative bg-black/50");
    } else if (e.type === "dragleave") {
      setIsDrag(false);
      setIsStyle("bg-gray-100");
    }
  }

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setIsDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setIsStyle("bg-gray-100");
      onChange(e.dataTransfer.files);
      console.log(Object.values(e.dataTransfer.files));
    }
  }

  function handleChange(e: any) {
    onChange(e.target.files);
    console.log(Object.values(e.target.files));
  }

  function handleButton() {
    buttonUpload.current.click();
  }

  return (
    <div
      onDragEnter={handleDrag}
      className={`${isStyle} ${
        className && className
      } p-1 duration-300 w-32 h-32  group rounded-lg `}
    >
      <div
        className={`relative grid ${
          file === undefined ? "border-gray-300" : "border-none"
        } w-full h-full border-[3px] p-1 border-dashed rounded-lg place-items-center `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="z-10 flex flex-col items-center justify-center w-full h-full">
          {file !== undefined && (
            <div
              // onClick={handleButton}
              className="relative flex justify-center w-full h-full "
            >
              <div className="absolute bottom-0 z-20 flex items-center gap-2">
                <span
                  onClick={handleButton}
                  className="p-1 duration-300 bg-white rounded-full cursor-pointer drop-shadow text-brand hover:text-white hover:bg-brand"
                >
                  <FiEdit3 />
                </span>
              </div>
              <div className="relative aspect-square">
                <Image alt="" src={ImgPreviewUrl} fill />
              </div>
            </div>
          )}
          {file === undefined && (
            <>
              <p className="text-[10px] text-center">
                Drag and drop your file here or
              </p>
              <span
                onClick={handleButton}
                className="px-2 mt-3 text-xs duration-300 rounded-full cursor-pointer drop-shadow group-hover:scale-110 "
              >
                Upload a file
              </span>
            </>
          )}
        </div>
      </div>
      <input
        className="absolute opacity-0 -z-10"
        onDrop={handleDrop}
        type="file"
        ref={buttonUpload}
        onChange={(e) => {
          handleChange(e);
        }}
        style={{ display: isDrag ? "" : "none" }}
      />
    </div>
  );
}
