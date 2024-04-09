import React from "react";
import { IoClose } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";

interface IProps {
  state: boolean;
  editTitle?: string;
  cancelTitle?: string;
  onEdit: () => void;
  onCancel: () => void;
}

export default function EditButton(props: IProps) {
  const { editTitle, cancelTitle, state, onEdit, onCancel } = props;
  return (
    <>
      {state ? (
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-3 duration-300 rounded-full bg-red-500/30"
        >
          {cancelTitle === undefined ? "Cancel" : cancelTitle}
          <IoClose />
        </button>
      ) : (
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-3 duration-300 rounded-full hover:bg-[#F1F5F9]"
        >
          {editTitle === undefined ? "Edit" : editTitle}
          <TbEdit />
        </button>
      )}
    </>
  );
}
