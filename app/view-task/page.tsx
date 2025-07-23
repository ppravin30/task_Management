'use client'
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './view-task.module.css';

interface Task {
  task: string;
  dueDate: string;
  category: string;
}

const TaskDetails: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const index = Number(searchParams.get('index'));

  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Task>({
    task: '',
    dueDate: '',
    category: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    const parsed: Task[] = stored ? JSON.parse(stored) : [];
    setTasks(parsed);
    if (parsed[index]) {
      setTask(parsed[index]);
      setEditData(parsed[index]);
    }
  }, [index]);

  const handleDelete = () => {
    const updated = tasks.filter((_, i) => i !== index);
    localStorage.setItem('tasks', JSON.stringify(updated));
    router.push('/');
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTasks = tasks.map((t, i) => (i === index ? editData : t));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setTask(editData);
    setIsEditing(false);
  };

  if (!task) return <div className={styles.notFound}>Task not found.</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Task Details</h2>
      {isEditing ? (
        <form className={styles.form} onSubmit={handleEditSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Task:</label>
            <input
              className={styles.input}
              type="text"
              name="task"
              value={editData.task}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Due Date:</label>
            <input
              className={styles.input}
              type="date"
              name="dueDate"
              value={editData.dueDate}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Category:</label>
            <select
              className={styles.input}
              name="category"
              value={editData.category}
              onChange={handleEditChange}
              required
            >
              <option value="">Select</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div className={styles.actions}>
            <button className={styles.saveButton} type="submit">Save</button>
            <button className={styles.cancelButton} type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className={styles.details}>
          <p><strong>Task:</strong> {task.task}</p>
          <p><strong>Due Date:</strong> {task.dueDate}</p>
          <p><strong>Category:</strong> {task.category}</p>
          <div className={styles.actions}>
            <button className={styles.editButton} onClick={() => setIsEditing(true)}>Edit</button>
            <button className={styles.deleteButton} onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Wrap TaskDetails in Suspense for useSearchParams
export default function ViewTaskPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TaskDetails />
    </Suspense>
  );
}

