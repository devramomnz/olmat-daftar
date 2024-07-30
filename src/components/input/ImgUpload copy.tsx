import { useLayout } from "@/hooks/zustand/layout";
import { Form, Image } from "antd";
import React, { useRef, useState } from "react";
import { FiEdit3 } from "react-icons/fi";

interface IProps {
  onChange: (e: any) => void;
  file?: string;
  name?: string;
  title?: string;
  className?: string;
}

export default function ImgUploadOld(props: IProps) {
  const { setError } = useLayout();
  const { onChange, name, title, file, className } = props;
  const [isDrag, setIsDrag] = useState(false);
  const [isStyle, setIsStyle] = useState("bg-gray-100");
  const buttonUpload = useRef<any>();
  // const thisFile = URL.createObjectURL(file);

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
      const uploadedFile = e.dataTransfer.files[0];
      const allowedExtensions = ["jpeg", "jpg", "png"];
      const fileExtension = uploadedFile.name.split(".").pop()?.toLowerCase();
      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        setIsStyle("bg-gray-100");
        onChange(uploadedFile);
      } else {
        setError(true, "Please upload a JPEG, JPG, or PNG file.");
        setIsStyle("bg-gray-100");
      }
    }
  }

  function handleChange(e: any) {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      const allowedExtensions = ["jpeg", "jpg", "png"];
      const fileExtension = uploadedFile.name.split(".").pop()?.toLowerCase();
      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        onChange(uploadedFile);
      } else {
        setError(true, "Please upload a JPEG, JPG, or PNG file.");
        setIsStyle("bg-gray-100");
      }
    }
  }

  function handleButton() {
    buttonUpload.current.click();
  }

  return (
    <div
      onDragEnter={handleDrag}
      className={`${isStyle} ${
        className && className
      } p-1 duration-300 w-32 h-full group rounded-lg `}
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
        <div className="z-10 flex flex-col items-center justify-center w-full h-fit">
          {file !== undefined && (
            <div
              // onClick={handleButton}
              className="relative flex justify-center w-full h-full "
            >
              <div className="absolute bottom-0 z-20 flex items-center gap-2">
                <span
                  onClick={handleButton}
                  className="p-2 duration-300 rounded-full cursor-pointer drop-shadow text-brand hover:text-white bg-white hover:bg-brand"
                >
                  <FiEdit3 />
                </span>
              </div>
              <div className="relative w-32 aspect-square h-full">
                <Image alt="" src={file} />
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
      <Form.Item
        required
        name={name}
        rules={[
          {
            // required: true,
            message: `Please input ${title}`,
          },
        ]}
      >
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
      </Form.Item>
    </div>
  );
}
