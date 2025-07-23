'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './tasklist.module.css';

interface Task {
  id: number;
  name: string;
  dueDate: string;
  category: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch tasks from the database via API
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/tasks', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setTasks(data);
        } else {
          setTasks([]);
        }
      } catch {
        setTasks([]);
      }
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const handleView = (id: number) => {
    router.push(`/view-task?id=${id}`);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks => tasks.filter(task => task.id !== id));
  };

  if (loading) {
    return <p className={styles.empty}>Loading...</p>;
  }

  if (tasks.length === 0) {
    return <p className={styles.empty}>No tasks yet.</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Task List</h2>
      <ul className={styles.list}>
        {tasks.map((task) => (
          <li className={styles.listItem} key={task.id}>
            <span className={styles.task}>{task.name}</span>
            <span className={styles.dueDate}>{task.dueDate.slice(0, 10)}</span>
            <span className={styles.category}>{task.category}</span>
            <div className={styles.actions}>
              <button
                className={styles.viewButton}
                onClick={() => handleView(task.id)}
                type="button"
              >
                View
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(task.id)}
                type="button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;