import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './../../Component/AuthContext/AuthContext';
import { Link, useNavigate } from 'react-router';


const LoginForm = () => {
  const { login, googleSignIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('✅ Logged in successfully!');
      navigate('/'); 
    } catch (err) {
      toast.error(`❌ Login failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleSignIn();
      toast.success('✅ Logged in with Google!');
      navigate('/'); 
    } catch (err) {
      toast.error(`❌ Google login failed: ${err.message}`);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('bg2.png')` }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/10 backdrop-blur-md text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 rounded bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 rounded bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
        />

        <div className="flex justify-between items-center text-sm mb-4">
          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-white" />
            Remember Me
          </label>
          <span className="underline cursor-pointer">Forget Password</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 transition"
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        <button
          type="button"
          onClick={handleGoogle}
          className="w-full mt-3 border border-white text-white font-semibold py-2 rounded hover:bg-white/20 transition"
        >
          Login with Google
        </button>

        <p className="text-center text-sm text-white mt-3">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-white underline hover:text-gray-200 font-semibold"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
