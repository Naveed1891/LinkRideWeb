import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/api/token/', form);
      localStorage.setItem('token', res.data.access);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" onChange={handleChange} value={form.username} placeholder="Username" className="w-full p-2 border rounded" />
        <input name="password" type="password" onChange={handleChange} value={form.password} placeholder="Password" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-secondary text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;