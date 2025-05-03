"use client";
import './style.css'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import Todo from '../singleTodo'
interface ToDoProps {
  theme: string;
}

export default function ToDo({ theme }: ToDoProps) {
  type Todo = {
    text: string;
    time: string;
    id: number;
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isDark, setIsDark] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [perPage , setPerPage] = useState<number>(1);
  const [sorted , setSorted] = useState<boolean>(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todo");
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      setTodos(parsedTodos);
      setCurrentPage(0);
    }
  }, []);

  useEffect(() => {
    if (todos.length === 0) {
      localStorage.removeItem("todo");
    } else {
      localStorage.setItem("todo", JSON.stringify(todos));
    }
  }, [todos]);
  const totalPages = todos.length === 0 ? 0 : Math.ceil(todos.length / perPage);
  const lastPostIndex = (currentPage + 1) * perPage;
  const firstPostIndex = currentPage * perPage;
  const currentPost = todos.slice(firstPostIndex, lastPostIndex);
  const handleAddClick = () => {
    if (inputValue.trim()) {
      const newTodo = { text: inputValue, id: Math.random(), time: new Date().toLocaleTimeString() };
      let newTodos = [...todos];
      sorted ? newTodos.push(newTodo) : newTodos.unshift(newTodo);
      setTodos(newTodos);
      setInputValue("");
      setCurrentPage(0)
    }
  };


  const handleMood = () => {
    setIsDark(!isDark);
  };
  const handleRemoveClick = (id: number) => {
    let text = ''
    if (confirm("Press a button!")) {
      text = "You pressed OK!";
    } else {
      text = "You pressed Cancel!";
    }
    console.log(text)
    if(text == 'You pressed OK!'){
      const newTodos = todos.filter((todo) => todo.id !== id);
      const newTotalPages = newTodos.length === 0 ? 0 : Math.ceil(newTodos.length / perPage);
      if (currentPage >= newTotalPages && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
      setTodos(newTodos);
    }
  };
  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  };

  const handleInputPagination = (e: number) => {
    setPerPage(e);
    setCurrentPage(0);
  };
  const handleSort = () => {
    const reversed = [...todos].reverse();
    setTodos(reversed);
    setSorted(!sorted);
    setCurrentPage(0);
  }
  const handleNext = () => {
    if (currentPage < totalPages - 1){
      setCurrentPage(currentPage + 1)
    }
  };
  const handleFirstPage = () => {
    setCurrentPage(0);
  }
  const handleLastPage = () => {
    setCurrentPage(totalPages - 1);
  }
  return (
    <div className={`${theme}`}>
      <div
        className={`${isDark ? "dark_mood dark" : "light_mood"}`}
      >
        <button onClick={handleMood}>
          {isDark ? "light mood" : "dark mood"}
        </button>
        <h1>TODO</h1>
        <div className="flex justify-center min-h-screen  sm:h-screen sm:flex sm:justify-center sm:items-center">
          <div className="flex flex-col items-center gap-4 w-full px-2">
            <div className="flex gap-2 w-full max-w-md">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a new todo"
                className="px-4 py-2 rounded w-full"
              />
              <button onClick={handleAddClick} className="border px-4 py-2">
                Add
              </button>
            </div>

            <div className='flex justify-center' >
              <select
                onChange={(e) => handleInputPagination(Number(e.target.value))}
                className="px-4 py-2 rounded w-full"
              >
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
              </select>
              <button  className="border px-4 py-2 ml-2" onClick={handleSort} >sort</button>
            </div>

            <ul className="w-full max-w-md">
              {currentPost.length === 0 ? (
                <li className="text-center text-gray-500 py-4">No todos yet</li>
              ) : (
                currentPost.map((item) => (
                  <Todo
                    key={item.id}
                    item={item}
                    handleRemoveClick={handleRemoveClick}
                    isDark={isDark}
                  />
                ))
              )}
            </ul>

            <div className="flex gap-2">
              <button onClick={handleFirstPage} >first page</button>
              <button onClick={handlePrev} disabled={currentPage === 0}>
                Previous
              </button>
              <span>Page {totalPages === 0 ? 0 : currentPage + 1} of {totalPages}</span>
              <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
                Next
              </button>
              <button onClick={handleLastPage} >last page</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
