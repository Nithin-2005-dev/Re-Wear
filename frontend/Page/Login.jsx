import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie"
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, { email, password });
      Cookies.set('token', res.data.token, { expires: 7 });
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };


  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-6">
      <form onSubmit={handleLogin} className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-white">Welcome Back 👋</h2>

        <label className="block mb-2 text-zinc-400">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 rounded bg-zinc-800 text-white border border-zinc-700 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 text-zinc-400">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 rounded bg-zinc-800 text-white border border-zinc-700 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded font-medium">
          Log In
        </button>

        <p className="text-sm text-zinc-400 mt-4">
          Don't have an account? <Link to="/register" className="text-emerald-400 hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;