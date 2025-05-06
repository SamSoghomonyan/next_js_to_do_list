"use client"

import { useParams } from 'next/navigation';
import Link from 'next/link';
import './style.css'
import { useEffect, useState } from 'react'

type Todo = {
  text: string;
  time: string;
  group: string;
  id: number;
};

export default function TodoPage() {
  const params = useParams();
  const id = Number(params.id);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todo");
    if (storedTodos) {
      const parsedTodos: Todo[] = JSON.parse(storedTodos);
      const foundTodo = parsedTodos.find((item) => item.id === id);
      if (foundTodo) {
        setTodo(foundTodo);
        setSelectedGroup(foundTodo.group || "");
      }
    }
  }, [id]);

  const handleGroupChange = (e:any) => {
    const newGroup = e.target.value;
    setSelectedGroup(newGroup);

    const storedTodos = localStorage.getItem("todo");
    if (storedTodos) {
      const parsedTodos: Todo[] = JSON.parse(storedTodos);
      const updatedTodos = parsedTodos.map((item) =>
        item.id === id ? { ...item, group: newGroup } : item
      );
      localStorage.setItem("todo", JSON.stringify(updatedTodos));
      setTodo(updatedTodos.find((item) => item.id === id) || null);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-100 to-purple-200 min-h-screen p-6">
      <Link href="/todos">
        <button className="mb-6  bg-white hover:bg-green-800 hover:text-white text-green-800 font-semibold py-2 px-4 rounded shadow cursor-pointer">
          Back
        </button>
      </Link>
      <div className="flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold  mb-4">{todo?.text}</h1>
          <p className="text-lg">{todo?.time}</p>

          {todo?.group ? (
            <p className="mt-4  font-semibold">Group: {todo.group}</p>
          ) : (
            <div className="mt-4">
              <h2 className=" mb-2">You can add a group to your task:</h2>
              <select
                className="px-4 py-2 rounded w-full border border-gray-300"
                value={selectedGroup}
                onChange={handleGroupChange}
              >
                <option value="">Group your tasks</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="pets">Pets</option>
                <option value="work">Work</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
