'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './create-task.module.css';

interface TaskFormData {
  task: string;
  dueDate: string;
  category: string;
}

const CreateTaskPage: React.FC = () => {
  const [formData, setFormData] = useState<TaskFormData>({
    task: '',
    dueDate: '',
    category: '',
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Get existing tasks
    const existing = JSON.parse(localStorage.getItem('tasks') || '[]');
    // Add new task
    const updated = [...existing, formData];
    localStorage.setItem('tasks', JSON.stringify(updated));
    setFormData({
      task: '',
      dueDate: '',
      category: '',
    });
    // Redirect to home page
    router.push('/');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Task:</label>
        <input
          className={styles.input}
          type="text"
          name="task"
          value={formData.task}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Due Date:</label>
        <input
          className={styles.input}
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Category:</label>
        <select
          className={styles.input}
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>
      <button className={styles.submitButton} type="submit">
        Add Task
      </button>
    </form>
  );
};

export default CreateTaskPage;
