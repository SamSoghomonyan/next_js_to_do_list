import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-6">
      <h1 className="text-4xl font-bold text-center mb-4">
        Welcome to Our To-Do App!
      </h1>

      <h1 className="text-lg text-center  mb-6">
        Organize your tasks, create your to-do list, and keep track of everything that needs to be done!
      </h1>
        <Link href="/todos" >
          <span className="px-6 py-3 bg-green-800 hover:bg-white hover:text-green-800 hover:border hover:border-green-800 rounded-lg cursor-pointer">
            Create a To-Do
          </span>
        </Link>
    </div>
  );
}
