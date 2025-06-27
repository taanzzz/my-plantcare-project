import React, { useContext, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { AuthContext } from './../../Component/AuthContext/AuthContext';
import { Link, useNavigate } from 'react-router';
import { User, Lock, Mail, UserPlus, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';

const RegisterForm = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const backgroundImage = 'https://i.ibb.co/20MfL4y2/20250627-123528.jpg'; 

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validatePassword = password =>
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    password.length >= 6;

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    if (!validatePassword(formData.password)) {
      toast.error("❌ Invalid password: Must have uppercase, lowercase, and be at least 6 characters.");
      setLoading(false);
      return;
    }
    
    try {
      await register(formData);
      toast.success("🎉 Registration successful!");
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      toast.error(`⚠️ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-cover bg-center bg-gray-900"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 "></div>
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
                <UserPlus className="w-12 h-12 text-green-400" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-lime-700 mb-2 drop-shadow-sm">
  Create an Account
</h2>
<p className="text-gray-700">
  Join our community to track your plant's journey.
</p>

        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
  {/* Full Name Input */}
  <div>
    <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
      Full Name
    </label>
    <div className="relative">
      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-lime-600" size={20} />
      <input
        id="name"
        name="name"
        onChange={handleChange}
        placeholder="Enter your name"
        required
        className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-300 text-gray-800 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-300 shadow-sm"
      />
    </div>
  </div>

  {/* Email Input */}
  <div>
    <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
      Email Address
    </label>
    <div className="relative">
      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-lime-600" size={20} />
      <input
        id="email"
        name="email"
        onChange={handleChange}
        placeholder="you@example.com"
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
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Create a strong password"
        required
        className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-300 text-gray-800 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-300 shadow-sm"
      />
    </div>
  </div>

  <button
    type="submit"
    disabled={loading}
    className="w-full bg-lime-500 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-lime-600 focus:outline-none focus:ring-4 focus:ring-lime-400/50 transition-all duration-300 transform hover:scale-[1.01] flex items-center justify-center gap-2"
  >
    {loading ? (
      <ClipLoader color="#fff" size={20} />
    ) : (
      <>
        <ChevronRight size={20} /> Register
      </>
    )}
  </button>
</form>


        <p className="text-center text-sm text-gray-700 mt-6">
  Already have an account?{' '}
  <Link
    to="/login"
    className="text-lime-600 hover:underline hover:text-lime-500 font-semibold transition-colors"
  >
    Sign In
  </Link>
</p>

      </motion.div>
    </div>
  );
};

export default RegisterForm;