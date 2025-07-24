'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoadingSpinner from './Loading';

interface Task {
  id: number;
  name: string;
  dueDate: string;
  category: string;
}

// ✅ Accept userId as a prop
interface TaskListProps {
  userId: number;
}

const TaskList: React.FC<TaskListProps> = ({ userId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryFilter = searchParams.get('category') || '';
  const dateFilter = searchParams.get('due') || '';
  const searchFilter = searchParams.get('search') || '';

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/tasks?userId=${userId}`, { cache: 'no-store' }); // ✅ filter by user
        if (res.ok) {
          const data = await res.json();
          setTasks(data);
        } else {
          const errorData = await res.json();
          setError(errorData.error || 'Failed to fetch tasks');
          setTasks([]);
        }
      } catch {
        setError('Failed to connect to server');
        setTasks([]);
      }
      setLoading(false);
    };
    fetchTasks();
  }, [userId]);

  const filteredTasks = tasks.filter(task => {
    if (categoryFilter && task.category !== categoryFilter) return false;

    if (dateFilter) {
      const today = new Date();
      const dueDate = new Date(task.dueDate);

      switch (dateFilter) {
        case 'today':
          if (dueDate.toDateString() !== today.toDateString()) return false;
          break;
        case 'week':
          const weekFromNow = new Date(today);
          weekFromNow.setDate(today.getDate() + 7);
          if (dueDate > weekFromNow || dueDate < today) return false;
          break;
        case 'month':
          const monthFromNow = new Date(today);
          monthFromNow.setMonth(today.getMonth() + 1);
          if (dueDate > monthFromNow || dueDate < today) return false;
          break;
      }
    }

    if (searchFilter && !task.name.toLowerCase().includes(searchFilter.toLowerCase())) {
      return false;
    }

    return true;
  });

  const handleView = (id: number) => {
    router.push(`/view-task?id=${id}`);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    setDeletingIds(prev => new Set(prev).add(id));

    try {
      const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTasks(tasks => tasks.filter(task => task.id !== id));
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to delete task');
      }
    } catch {
      alert('Failed to delete task');
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Work': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'Personal': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'Urgent': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const renderContent = () => {
    if (loading) return <LoadingSpinner />;

    if (error) {
      return (
        <div className="text-center py-12">
          <div className="text-red-600 dark:text-red-400 mb-4">⚠️ {error}</div>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">Retry</button>
        </div>
      );
    }

    if (tasks.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400 mb-4">📝 No tasks yet</div>
          <p className="text-gray-400 dark:text-gray-500 mb-6">Create your first task to get started!</p>
          <button onClick={() => router.push('/create-task')} className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
            Create Task
          </button>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Your Tasks</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {(categoryFilter || dateFilter || searchFilter)
              ? `Filtered: ${filteredTasks.length} ${filteredTasks.length === 1 ? 'task' : 'tasks'} from ${tasks.length} total`
              : `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}`}
          </span>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 mb-4">No tasks match your filters</div>
            <button onClick={() => router.push('/')} className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg dark:hover:shadow-xl transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">{task.name}</h3>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <span className="mr-1">📅</span>
                        {formatDate(task.dueDate)}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
                        {task.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button onClick={() => handleView(task.id)} className="px-3 py-1 text-sm bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">View</button>
                    <button onClick={() => handleDelete(task.id)} disabled={deletingIds.has(task.id)} className="px-3 py-1 text-sm bg-red-600 dark:bg-red-500 text-white rounded hover:bg-red-700 dark:hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      {deletingIds.has(task.id) ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return <div className="max-w-4xl mx-auto">{renderContent()}</div>;
};

export default TaskList;

