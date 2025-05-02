type SingleTodoProps = {
  item: { text: string; completed: boolean };
  index: number;
  handleRemoveClick: (index: number) => void;
  isDark: boolean;
};

export default function SingleTodo({ item, index, handleRemoveClick ,isDark }: SingleTodoProps) {
  return (
    <div className={`${isDark ? "dark_mood dark text-white" : "light_mood text-black"}`} >
      <li
        className="flex justify-between items-center border-b py-2 dark:border-gray-600"
        style={{
          textDecoration: item.completed ? "line-through" : "none",
        }}
      >
        <span>{item.text}</span>
        <button
          className="text-red-500"
          onClick={() => handleRemoveClick(index)}
        >
          Delete
        </button>
      </li>
    </div>
  );
}
