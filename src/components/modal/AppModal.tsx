import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";

interface IProps {
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: any;
  title?: string;
  className?: string;
}
export default function AppModal(props: IProps) {
  const { children, setOpen, open, title, className } = props;

  return (
    <button onClick={setOpen} className="w-screen h-screen bg-danger-50 fixed">
      <Modal isOpen={open} className="w-full">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody className={`${className}`}>{children}</ModalBody>
            {/* <ModalFooter>
              </ModalFooter> */}
          </>
        </ModalContent>
      </Modal>
    </button>
  );
}
