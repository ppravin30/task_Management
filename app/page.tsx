import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Task Management App
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Organize your tasks efficiently and stay productive
        </p>
      </div>
      <TaskList />
    </main>
  );
}






