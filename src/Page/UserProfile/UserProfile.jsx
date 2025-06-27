import React, { useContext } from 'react';
import { AuthContext } from './../../Component/AuthContext/AuthContext';
import { useNavigate } from 'react-router';
import { Pencil, User, Mail, AtSign, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { SyncLoader } from 'react-spinners'; 

const UserProfile = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] dark:bg-zinc-950 transition-colors duration-500">
        <SyncLoader color="#10B981" size={15} />
      </div>
    );
  }

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 px-6 max-w-4xl mx-auto dark:bg-zinc-900 bg-white rounded-2xl shadow-xl transition-all duration-300"
      >
        <p className="text-2xl font-semibold text-gray-500 dark:text-gray-400">
          No user is currently logged in.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="mt-6 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <User /> Login Now
        </button>
      </motion.div>
    );
  }

  return (
    <section className="min-h-screen py-16 px-4 md:px-10 bg-gray-50 dark:bg-zinc-950 transition-colors duration-500 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full mx-auto p-6 md:p-12 bg-white dark:bg-zinc-900 shadow-3xl rounded-3xl border border-gray-200/60 dark:border-zinc-800/60 transition-all duration-300 text-center"
      >
        <div className="flex flex-col items-center gap-4 md:gap-8"> 
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-green-500 dark:border-green-400 shadow-2xl overflow-hidden group">
            <img
              src={user.photoURL || 'https://i.ibb.co/FbDdMYbZ/vecteezy-blue-profile-icon-36885313.png'}
              alt="User Avatar"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          
          <div className="space-y-3 text-gray-800 dark:text-gray-200 w-full">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-gray-50 flex items-center justify-center gap-4">
                <User className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
                {user.displayName || 'Unnamed User'}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              
              <p className="flex items-center gap-3 bg-gray-100 dark:bg-zinc-800 p-4 rounded-xl shadow-inner text-base truncate">
                <Mail className="w-6 h-6 text-blue-500" />
                <span className="font-semibold text-gray-600 dark:text-gray-400">Email:</span> {user.email}
              </p>
              <p className="flex items-center gap-3 bg-gray-100 dark:bg-zinc-800 p-4 rounded-xl shadow-inner text-base truncate">
                <AtSign className="w-6 h-6 text-purple-500" />
                <span className="font-semibold text-gray-600 dark:text-gray-400">UID:</span> {user.uid}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            
            onClick={() => navigate('/dashboard/update-profile')}
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.05] focus:outline-none focus:ring-4 focus:ring-green-500/50"
          >
            <Pencil size={20} /> Edit Profile
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default UserProfile;