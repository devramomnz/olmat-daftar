import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Upload, Modal, Button, Image } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface IUpload {
  labelName: string;
  name: string;
  file?: any;
  setFile?: any;
  onChange: (e: any) => void;
}

export function AntUpload(props: IUpload) {
  const { file, labelName, name, onChange } = props;
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

      <div>
        <label className="text-sm">{labelName}</label>
        <Form.Item className="bg-[#F5F5F5] rounded-md min-h-32 p-3" name={name}>
          <Upload
            name={name}
            //  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture"
            fileList={file}
            defaultFileList={file}
            onPreview={handlePreview}
            onChange={(e) => onChange(e.fileList)}
            multiple={false}
            maxCount={1}
          >
            <Button
              size="small"
              icon={<PlusOutlined />}
              className="w-full"
            ></Button>
          </Upload>
        </Form.Item>
      </div>
    </>
  );
}

export default AntUpload;
