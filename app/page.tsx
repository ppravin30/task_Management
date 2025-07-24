// app/page.tsx or wherever your home page is
import { Suspense } from 'react';
import TaskList from "@/components/TaskList";
import TaskFilters from "@/components/TaskFilters";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in'); // or your sign-in page route
  }



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
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Your Tasks</h2>
        <Suspense fallback={<div>Loading filters...</div>}>
          <TaskFilters />
        </Suspense>
        <Suspense fallback={<div>Loading tasks...</div>}>
          <TaskList userId={user.id} /> {/* optionally pass userId to filter */}
        </Suspense>
      </div>
    </main>
  );
};








