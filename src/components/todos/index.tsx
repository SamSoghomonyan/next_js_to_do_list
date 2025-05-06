"use client";
import './style.css'
import { useState, useEffect } from "react";
import Todo from '../singleTodo'

interface ToDoProps {
  theme: string;
}

export default function Todos({ theme }: ToDoProps) {
  type Todo = {
    text: string;
    id: number;
    group: string;
    time: string;
    isComplete: boolean;
  };

  const [fullTodos, setFullTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isDark, setIsDark] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(1);
  const [group, setGroup] = useState<string>('');
  const [sorted, setSorted] = useState<boolean>(false);
  const [search,setSearch] = useState<string>('');
  console.log('hdghg')
  useEffect(() => {
    const storedTodos = localStorage.getItem("todo");
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      setFullTodos(parsedTodos);
      setTodos(parsedTodos);
      setCurrentPage(0);
    }
  }, []);

  useEffect(() => {
    if (fullTodos.length === 0) {
      localStorage.removeItem("todo");
    } else {
      localStorage.setItem("todo", JSON.stringify(fullTodos));
    }
  }, [fullTodos]);

  const totalPages = todos.length === 0 ? 0 : Math.ceil(todos.length / perPage);
  const lastPostIndex = (currentPage + 1) * perPage;
  const firstPostIndex = currentPage * perPage;
  const currentPost = todos.slice(firstPostIndex, lastPostIndex);

  const handleCompleted = (id: number) => {
    const updatedTodos = fullTodos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isComplete: true };
      }
      return todo;
    });

    setFullTodos(updatedTodos);
    setTodos(updatedTodos);
  };
  const handleEdited = (id: number , name:string) => {
    const edtiedTode = fullTodos.map(todo => {
      if(todo.id === id) {
        return {...todo, text: name}
      }
      return todo
    })
    setFullTodos(edtiedTode)
    setTodos(edtiedTode)
  }
  const handleAddClick = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        text: inputValue,
        id: Math.floor(Math.random() * 1000000),
        time: new Date().toLocaleTimeString(),
        isComplete: false,
        group: group,
      };
      const updatedTodos = sorted ? [...fullTodos, newTodo] : [newTodo, ...fullTodos];
      setFullTodos(updatedTodos);
      setTodos(updatedTodos);
      setInputValue("");
      setCurrentPage(0);
    }
  };

  useEffect(() => {
    if (search.trim().length > 0) {
      const filtered = fullTodos.filter(todo =>
        todo.text.toLowerCase().includes(search.trim().toLowerCase())
      );
      setTodos(filtered);
    } else {
      setTodos(fullTodos);
    }
    setCurrentPage(0);
  }, [search, fullTodos]);

  const handleMood = () => {
    setIsDark(!isDark);
  };
  const handleRemoveClick = (id: number) => {
    const newTodos = fullTodos.filter((todo) => todo.id !== id);
    const newTotalPages = newTodos.length === 0 ? 0 : Math.ceil(newTodos.length / perPage);
    if (currentPage >= newTotalPages && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
    setFullTodos(newTodos);
    setTodos(newTodos);
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(0);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages - 1);
  };

  const handleInputPagination = (e: number) => {
    setPerPage(e);
    setCurrentPage(0);
  };

  const handleTodoGroup = (e: string) => {
    setGroup(e);
  };

  const handleSort = (group: string) => {
    let filtered = fullTodos;

    if (group && group !== "all") {
      filtered = filtered.filter(todo => todo.group === group);
    }

    const sortedByTime = [...filtered].sort((a, b) => {
      const timeA = new Date(`1970-01-01T${a.time}`).getTime();
      const timeB = new Date(`1970-01-01T${b.time}`).getTime();
      return timeB - timeA;
    });

    setTodos(sortedByTime);
    setSorted(true);
    setCurrentPage(0);
  };


  return (
    <div className={`${theme}`}>
      <div className={`${isDark ? "dark_mood dark" : "light_mood"}`}>
        <label className="inline-flex items-center cursor-pointer">
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 p-4">
             {isDark ? "Dark mode" : "Light mode"}
          </span>
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isDark}
            onChange={handleMood}
          />
          <div
            className="relative w-11 h-6  rounded-full peer peer-focus:ring-4  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all bg-green-800 dark:border-gray-600 dark:bg-green-500"
          ></div>
        </label>
        <div className="flex justify-center pt-10 min-h-screen">
          <div className="flex flex-col items-center gap-4 w-full px-2">
            <h1>TODO</h1>
            <div className="flex gap-2 w-full max-w-md">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a new todo"
                className="px-4 py-2 rounded w-full"
              />
              <select
                onChange={(e) => handleTodoGroup(e.target.value)}
                className="px-4 py-2 rounded w-full"
              >
                <option value="">Group your tasks</option>
                <option value="personal">personal</option>
                <option value="shopping">shopping</option>
                <option value="pets">pets</option>
                <option value="work">work</option>
              </select>
              <button onClick={handleAddClick} className="border px-4 py-2">
                Add
              </button>
            </div>
            <div>
              <label>You can search todo with name</label>
              <input value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <ul className="w-full max-w-md">
              {currentPost.length === 0 ? (
                <li className="text-center text-gray-500 py-4">No todos yet</li>
              ) : (
                currentPost.map((item) => (
                  <Todo
                    key={item.id}
                    item={item}
                    handleClick={handleRemoveClick}
                    handleCompleted={handleCompleted}
                    handleEdited={handleEdited}
                    isDark={isDark}
                  />
                ))
              )}
            </ul>

            <div className="flex gap-2">
              <button onClick={handleFirstPage}>first page</button>
              <button onClick={handlePrev} disabled={currentPage === 0}>
                Previous
              </button>
              <span className='bg-transparent'>
                Page {totalPages === 0 ? 0 : currentPage + 1} of {totalPages}
              </span>
              <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
                Next
              </button>
              <button onClick={handleLastPage}>last page</button>
            </div>

            <div className="flex items-center space-x-4">
              <label htmlFor="tasksPerPage" className="text-sm font-medium text-gray-700">
                todos Per Page:
              </label>
              <select
                id="tasksPerPage"
                onChange={(e) => handleInputPagination(Number(e.target.value))}
                className="px-4 py-2 rounded"
              >
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
              </select>

              <label htmlFor="sortByGroup" className="text-sm font-medium text-gray-700">
                sort by group:
              </label>
              <select
                id="sortByGroup"
                onChange={(e) => handleSort(e.target.value)}
                className="px-4 py-2 rounded"
              >
                <option value="all">All Todos</option>
                <option value="personal">personal</option>
                <option value="pets">pets</option>
                <option value="work">work</option>
                <option value="shopping">shopping</option>
              </select>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
