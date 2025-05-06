"use client"
import {useState} from "react";

type editProps = {
  name: string;
  id:number;
  handleEdited: (id: number , name:string) => void
  handleEditCancel: () => void
  setIsEditing:(value: boolean) => void
};

export default function Edited({handleEdited ,name , id ,handleEditCancel , setIsEditing} :editProps) {
  const [editValue ,setEditvalue] = useState<string>(name);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40" onClick={(e)=>{
      e.preventDefault();
      e.stopPropagation();
    }}>
      <div className="relative bg-white text-black p-6 rounded-lg shadow-xl w-[100%] max-w-md">
        <label>Do you want to edit you to do</label>
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Edit your task..."
          value={editValue}
          onChange={(e)=>setEditvalue(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleEditCancel()
            }}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleEdited(id,editValue)
              setIsEditing(false)
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
