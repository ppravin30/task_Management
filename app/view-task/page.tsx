'use client'
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './view-task.module.css';

interface Task {
  id: number;
  name: string;
  dueDate: string;
  category: string;
}

const TaskDetails: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = Number(searchParams.get('id'));

  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Omit<Task, 'id'>>({
    name: '',
    dueDate: '',
    category: '',
  });
  const [loading, setLoading] = useState(true);

  // Fetch task from database
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/tasks/${id}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setTask(data);
          setEditData({
            name: data.name,
            dueDate: data.dueDate.slice(0, 10),
            category: data.category,
          });
        }
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    router.push('/');
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData),
    });
    if (res.ok) {
      const updated = await res.json();
      setTask(updated);
      setIsEditing(false);
    }
  };

  if (loading) return <div className={styles.notFound}>Loading...</div>;
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
              name="name"
              value={editData.name}
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
          <p><strong>Task:</strong> {task.name}</p>
          <p><strong>Due Date:</strong> {task.dueDate.slice(0, 10)}</p>
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
