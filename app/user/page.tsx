'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUpUser } from '../actions/sign-up';

export default function UserPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
  });

  // ✅ Updated password regex to allow special characters
  const validate = () => {
    const newErrors = {
      email: formData.email ? '' : 'Email is required',
      username: formData.username ? '' : 'Username is required',
      password: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(formData.password)
        ? ''
        : 'Password must be at least 8 characters long and include letters and numbers.',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Fixed: marked function as async + reordered logic
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    const submitData = new FormData();
    submitData.append('email', formData.email);
    submitData.append('username', formData.username);
    submitData.append('password', formData.password);

    const result = await signUpUser(submitData);

    if (result.success) {
      router.push('/');
    } else {
      alert(result.error || 'Sign-up failed.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-5"
      >
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Username</label>
          <input
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Min 8 characters, letters & numbers"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

