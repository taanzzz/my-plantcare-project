import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from './../../Component/AuthContext/AuthContext';
import { Link } from 'react-router'; 
import { motion, AnimatePresence } from 'framer-motion';

const MyProfile = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);
  const [canHover, setCanHover] = useState(false);
  const dropdownRef = useRef(null); 

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover)');
    setCanHover(mq.matches);

    const handler = (e) => setCanHover(e.matches);
    mq.addEventListener('change', handler);

    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const defaultPhoto = 'https://i.ibb.co/FbDdMYbZ/vecteezy-blue-profile-icon-36885313.png';

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('👋 Successfully logged out!');
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('⚠️ Failed to logout!');
    }
  };

  const handleMouseEnter = () => {
    if (canHover) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (canHover) {
      timeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, 300);
    }
  };

  const handleClick = () => {
    if (!canHover) {
      setOpen((prev) => !prev);
    }
  };
  
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2, ease: "easeOut" } },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      ref={dropdownRef}
    >
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer relative w-11 h-11 rounded-full border-2 border-transparent ring-2 ring-gray-300 dark:ring-zinc-700 hover:ring-green-500 transition-all duration-300 transform hover:shadow-lg"
      >
        <img
          className="w-full h-full object-cover rounded-full"
          src={user.photoURL || defaultPhoto}
          alt="User Avatar"
        />
        
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full shadow-md"></span>
      </motion.div>

      
      <AnimatePresence>
        {open && (
          <motion.ul
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute right-0 top-full mt-3 bg-white dark:bg-zinc-800 shadow-2xl rounded-xl w-56 z-50 p-3 space-y-2 border border-gray-200 dark:border-zinc-700 origin-top-right"
          >
            <li>
              <span
                onClick={() => {
                  toast.info(`Logged in as ${user.displayName || 'Anonymous'}`);
                  setOpen(false);
                }}
                className="block p-2 text-sm font-semibold text-gray-800 dark:text-gray-100 truncate cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                title={user.email}
              >
                {user.displayName || 'Anonymous'}
              </span>
            </li>
            <li>
              <Link
                
                to="/dashboard/profile"
                className="w-full text-center inline-block bg-green-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors text-sm"
                onClick={() => setOpen(false)}
              >
                My Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors text-sm"
              >
                Log Out
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyProfile;