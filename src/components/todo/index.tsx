"use client";
import './exmaple.css'
import { useState, useEffect } from "react";
import SingleTodo from '../singltodo'

interface ToDoProps {
  theme: string;
}

export default function ToDo({ theme }: ToDoProps) {
  type Todo = {
    text: string;
    completed: boolean;
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isDark, setIsDark] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [perPage] = useState<number>(5);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const lastPostIndex = (currentPage + 1) * perPage;
  const firstPostIndex = currentPage * perPage;
  const currentPost = todos.slice(firstPostIndex, lastPostIndex);
  const totalPages = Math.ceil(todos.length / perPage);

  console.log(totalPages)

  const handleAddClick = () => {
    if (inputValue.trim()) {
      const newTodos = [...todos, { text: inputValue, completed: false }];
      setTodos(newTodos);
      setInputValue("");

      const newTotalPages = Math.ceil(newTodos.length / perPage);
      setCurrentPage(newTotalPages - 1);
    }
  };

  const handleMood = () => {
    setIsDark(!isDark);
  };

  const handleRemoveClick = (index: number) => {
    const realIndex = firstPostIndex + index;
    setTodos(todos.filter((_, i) => i !== realIndex));
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1){
      setCurrentPage(currentPage + 1)
    }
  };

  return (
    <div className={`${theme}`}>
      <div className={`firstTheme ${isDark ? "dark_mood dark" : "light_mood"}`}>
        <button onClick={handleMood}>
          {isDark ? "light mood" : "dark mood"}
        </button>
        <h1>TODO</h1>
        <div className="flex justify-center min-h-screen">
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

            <ul className="w-full max-w-md">
              {currentPost.map((item, index) => (
                <SingleTodo
                  key={firstPostIndex + index}
                  item={item}
                  index={index}
                  handleRemoveClick={handleRemoveClick}
                  isDark={isDark}
                />
              ))}
            </ul>

            <div className="flex gap-2">
              <button onClick={handlePrev} disabled={currentPage === 0}>
                Previous
              </button>
              <span>Page {currentPage + 1} of {totalPages}</span>
              <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
