type SingleTodoProps = {
  item: { text: string ,time: string ,id: number };
  index: number;
  handleRemoveClick: (id: number) => void;
  isDark: boolean;
};

export default function SingleTodo({ item, handleRemoveClick ,isDark }: SingleTodoProps) {
  return (
    <div className={`${isDark ? "dark_mood dark text-white" : "light_mood text-black"}`} >
      <li
        className="flex justify-between items-center border-b py-2 dark:border-gray-600"
      >
        <span>{item.text}</span>
        <span>{item.time}</span>
        <button
          className="text-red-500 cursor-pointer "
          onClick={() => handleRemoveClick(item.id)}
        >
          Delete
        </button>
      </li>
    </div>
  );
}
