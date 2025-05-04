import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/api/register/', form);
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" onChange={handleChange} value={form.username} placeholder="Username" className="w-full p-2 border rounded" />
        <input name="password" type="password" onChange={handleChange} value={form.password} placeholder="Password" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
}

export default Register;