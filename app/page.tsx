import { Suspense } from 'react';
import TaskList from "@/components/TaskList";
import TaskFilters from "@/components/TaskFilters"

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
      <Suspense fallback={<div>Loading filters...</div>}>
        <TaskFilters />
      </Suspense>
      <Suspense fallback={<div>Loading tasks...</div>}>
        <TaskList />
      </Suspense>
    </main>
  );
}






