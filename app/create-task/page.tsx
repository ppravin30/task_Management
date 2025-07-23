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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to add task');
        setLoading(false);
        return;
      }
      setFormData({ task: '', dueDate: '', category: '' });
      router.push('/');
    } catch (err) {
      setError('Failed to add task');
      setLoading(false);
    }
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
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      <button className={styles.submitButton} type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};

export default CreateTaskPage;
