import Link from "next/link";

type SingleTodoProps = {
  item: { text: string ,time: string ,id: number };
  handleRemoveClick: (id: number) => void;
  isDark: boolean;
};

export default function Todo({ item, handleRemoveClick ,isDark }: SingleTodoProps) {
  return (
    <div className={`${isDark ? "dark_mood dark text-white" : "light_mood text-black"}`} >
      <li
        className="flex justify-between items-center border-b py-2 dark:border-gray-600"
      >
        <Link href={
          {
            pathname: `/todo/${item.id}`,
          }
        }>{item.text}</Link>
        <span>{item.time}</span>
        <button
          onClick={() => handleRemoveClick(item.id)}
        >
          Delete
        </button>
      </li>
    </div>
  );
}
