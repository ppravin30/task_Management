'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './tasklist.module.css';

interface TaskFormData {
  task: string;
  dueDate: string;
  category: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskFormData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = () => {
      const stored = localStorage.getItem('tasks');
      setTasks(stored ? JSON.parse(stored) : []);
    };
    fetchTasks();

    // Listen for storage changes (other tabs/windows)
    const onStorage = () => fetchTasks();
    window.addEventListener('storage', onStorage);

    // Optionally, reload when page regains focus
    window.addEventListener('focus', fetchTasks);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', fetchTasks);
    };
  }, []);

  const handleView = (idx: number) => {
    router.push(`/view-task?index=${idx}`);
  };

  const handleDelete = (idx: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== idx);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  if (tasks.length === 0) {
    return <p className={styles.empty}>No tasks yet.</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Task List</h2>
      <ul className={styles.list}>
        {tasks.map((task, idx) => (
          <li className={styles.listItem} key={idx}>
            <span className={styles.task}>{task.task}</span>
            <span className={styles.dueDate}>{task.dueDate}</span>
            <span className={styles.category}>{task.category}</span>
            <div className={styles.actions}>
              <button
                className={styles.viewButton}
                onClick={() => handleView(idx)}
                type="button"
              >
                View
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(idx)}
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