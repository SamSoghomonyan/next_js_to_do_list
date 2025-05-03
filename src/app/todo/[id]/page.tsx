"use client"

import { useParams } from 'next/navigation';
import Link from 'next/link';
import './style.css'
import { useEffect, useState } from 'react'

type Todo = {
  text: string;
  time: string;
  id: number;
};

export default function TodoPage() {
  const params = useParams();
  const id = params.id;
  const [todo, setTodo] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todo");
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      const newTodos = parsedTodos.filter((item: any) => item.id == id);
      setTodo(newTodos);
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-100 to-purple-200 min-h-screen p-6">
      <Link href="/">
        <button className="mb-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded shadow">
           Back
        </button>
      </Link>

      <div className="flex justify-center items-center">
          <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{todo[0]?.text}</h1>
            <p className="text-gray-600 text-lg"> {todo[0]?.time}</p>
          </div>
      </div>
    </div>
  );
}
