import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../Component/AuthContext/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail, KeyRound, ArrowRight, CornerRightUp } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';

const LoginForm = () => {
  const { login, googleSignIn, resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const backgroundImage = 'https://i.ibb.co/Xf5JYTWw/20250627-123419.jpg'; 

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

  const handleResetPassword = async () => {
    if (!email) {
      toast.error('❌ Please enter your email first!');
      return;
    }
    try {
      await resetPassword(email);
      toast.success('📩 Password reset email sent!');
    } catch (err) {
      toast.error(`❌ Failed to send reset email: ${err.message}`);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-cover bg-center bg-gray-900"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="absolute inset-0"></div> 
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md p-8 md:p-12 rounded-3xl shadow-2xl bg-white/5 backdrop-blur-xl border border-white/20 relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-green-500/10 rounded-full border-2 border-green-500/20 shadow-inner"
          >
            <CornerRightUp className="w-12 h-12 text-green-400" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-lime-700 mb-2 drop-shadow-sm">
  Welcome Back!
</h2>
<p className="text-gray-700">
  Sign in to manage your plant collection.
</p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
  {/* Email Input */}
  <div>
    <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
      Email Address
    </label>
    <div className="relative">
      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-lime-600" size={20} />
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-300 text-gray-800 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-300 shadow-sm"
      />
    </div>
  </div>

  {/* Password Input */}
  <div>
    <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
      Password
    </label>
    <div className="relative">
      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-lime-600" size={20} />
      <input
        id="password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-300 text-gray-800 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-300 shadow-sm"
      />
    </div>
  </div>

  
  <div className="flex justify-between items-center text-sm">
    <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
      <input
        type="checkbox"
        className="form-checkbox w-4 h-4 text-lime-500 border-gray-400 rounded accent-lime-500"
      />
      Remember Me
    </label>
    <button
      type="button"
      onClick={handleResetPassword}
      className="text-gray-700 hover:text-lime-500 font-semibold transition-colors duration-200 flex items-center gap-1"
    >
      <KeyRound size={16} /> Forgot Password?
    </button>
  </div>

  
  <button
    type="submit"
    disabled={loading}
    className="w-full bg-gradient-to-r from-lime-500 to-green-500 text-white font-bold py-3 rounded-xl shadow-md hover:from-lime-600 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-lime-400/50 transition-all duration-300 transform hover:scale-[1.01] flex items-center justify-center gap-2"
  >
    {loading ? (
      <ClipLoader color="#fff" size={20} />
    ) : (
      <>
        <ArrowRight size={20} /> Sign In
      </>
    )}
  </button>
</form>

        
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white/10 backdrop-blur-sm px-4 text-black font-medium">
              OR
            </span>
          </div>
        </div>

        
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full border border-gray-400/50 text-white font-semibold py-3 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3 shadow-md"
        >
          <FaGoogle className="text-xl" /> Continue with Google
        </button>

        
        <p className="text-center text-sm text-gray-700 mt-6">
  Don’t have an account?{' '}
  <Link
    to="/register"
    className="text-lime-600 hover:underline hover:text-lime-500 font-semibold transition-colors"
  >
    Create an Account
  </Link>
</p>

      </motion.div>
    </div>
  );
};

export default LoginForm;