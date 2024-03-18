import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Upload, Modal, Image } from "antd";
import { UploadFile, UploadProps } from "antd/lib/upload/interface";
import { UploadListType } from "antd/es/upload/interface";

type FileType = Parameters<NonNullable<UploadProps["beforeUpload"]>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface IUpload {
  listType?: UploadListType;
  uploadBtnTitle?: string;
  labelName?: string;
  name?: string;
  file?: UploadFile[];
  setFile?: any;
  className?: string;
  onRemove?: () => void;
  onChange?: (e: any) => void;
  require?: boolean;
}

export function AntUpload(props: IUpload) {
  const {
    require,
    file,
    uploadBtnTitle,
    labelName,
    className,
    name,
    listType,
    onRemove,
    onChange,
  } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  // const { Dragger } = Upload

  return (
    <>
      <Modal
        title={labelName}
        footer
        centered
        open={previewOpen}
        onOk={() => setPreviewOpen(false)}
        onCancel={() => handleCancel()}
      >
        <p>{previewTitle}</p>
        <Image width={"100%"} src={`${previewImage}`} alt="" />
      </Modal>

      <>
        <label className="text-sm">{labelName}</label>
        <Form.Item
          className="bg-[#F5F5F5] rounded-md w-full min-h-32 p-3"
          name={name}
          rules={[
            {
              required: require !== undefined,
              message: `Please input ${labelName}!`,
            },
          ]}
          valuePropName="file"
          getValueFromEvent={onChange}
        >
          <Upload
            name={name}
            listType={listType !== undefined ? `${listType}` : "picture"}
            fileList={file}
            supportServerRender={false}
            // showUploadList={false}
            onPreview={handlePreview}
            onChange={onChange}
            multiple={false}
            onRemove={onRemove === undefined ? () => true : onRemove}
            maxCount={1}
            className={`${className} flex flex-col`}
          >
            {uploadBtnTitle === undefined ? (
              <>
                <span className="flex py-1 items-center justify-center gap-3 px-3 rounded-full bg-gray-200">
                  <PlusOutlined /> Upload Image
                </span>
              </>
            ) : (
              <span className="flex py-1 items-center justify-center gap-3 px-3 rounded-full bg-gray-200">
                {uploadBtnTitle}
              </span>
            )}
          </Upload>
        </Form.Item>
      </>
    </>
  );
}

export default AntUpload;
