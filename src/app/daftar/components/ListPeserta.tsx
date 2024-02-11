import { IPeserta } from "@/interfaces/IPeserta";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

interface IProps {
  handleDelete: (i: number) => void;
  handleSelect: (i: number) => void;
  handleAddMore: () => void;
  payload: IPeserta[];
  iPayload: number;
}

export default function ListPeserta(props: IProps) {
  const { handleDelete, handleAddMore, handleSelect, payload, iPayload } =
    props;
  return (
    <div className="bg-white rounded-lg drop-shadow-md h-full overflow-hidden">
      <h1 className="font-bold bg-brand-dark text-white py-1 px-2 w-full">
        List Peserta
      </h1>
      <div className="flex flex-col gap-3 justify-start p-3 mt-2">
        {payload.map((data, i) => (
          <div className="flex" key={i}>
            {i !== 0 && (
              <button
                onClick={() => handleDelete(i)}
                className="text-red-600 text-xl w-1/5 "
              >
                <AiOutlineDelete />
              </button>
            )}
            <button
              onClick={() => handleSelect(i)}
              className={`${
                iPayload === i ? "bg-brand-dark/80 text-white" : "bg-gray-100"
              } w-full text-brand-dark font-bold rounded-md`}
            >
              Peserta {i + 1}
            </button>
          </div>
        ))}
        <button
          className="py-1 px-2 mb-28 bg-brand-dark rounded-lg w-full text-white font-bold mt-3 text-sm"
          onClick={handleAddMore}
        >
          Tambah Peserta
        </button>
      </div>
    </div>
  );
}
