"use client"

import Link from "next/link";
import { useState } from "react";
import PopUp from "@/components/PopUp";
import Edited from "@/components/edited";
type SingleTodoProps = {
  item: { text: string ,time: string ,id: number , isComplete: boolean };
  handleClick: (id: number) => void;
  isDark: boolean;
  handleCompleted: (id: number) => void;
  handleEdited: (id: number, name: string) => void;
};

export default function Todo({ item, handleClick, handleCompleted, isDark ,handleEdited }: SingleTodoProps) {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const handleDeleteClick = () => setIsDeleted(true);
  const handleCancelClick = () => setIsDeleted(false);

  const handleEditClick = () => setIsEditing(true);
  const handleEditCancel = () => setIsEditing(false);

  return (
    <Link href={{ pathname: `/todo/${item.id}` }}>
        <div className={`${isDark ? "dark_mood dark " : "light_mood "}`}>
          <li className="flex justify-between items-center border-b py-2 dark:border-gray-600">
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCompleted(item.id)
            }}
            className={`cursor-pointer ${item.isComplete ? "line-through bg-transparent opacity-60" : "bg-transparent"}`}
          >
            {item.text}
          </span>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleEditClick();
                }}
              >
                edit
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDeleteClick();
                }}
              >
                Delete
              </button>
            </div>

            {isDeleted && (
              <PopUp
                id={item.id}
                name={item.text}
                handleCancelClick={handleCancelClick}
                handleClick={handleClick}
              />
            )}
            {isEditing && (
              <Edited handleEditCancel={handleEditCancel} setIsEditing={setIsEditing} handleEdited={handleEdited} name={item.text} id={item.id}/>
            )}
          </li>
        </div>
    </Link>
  );
}
