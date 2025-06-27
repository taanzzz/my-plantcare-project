import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { LayoutDashboard, Layers, PlusCircle, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { AuthContext } from '../Component/AuthContext/AuthContext';

const Sidebar = ({ onLinkClick }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('👋 Successfully logged out!');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('⚠️ Failed to logout!');
    }

    if (onLinkClick) onLinkClick();
  };

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/dashboard/my-plants', label: 'My Plants', icon: Layers },
    { to: '/dashboard/add-plant', label: 'Add Plant', icon: PlusCircle },
    { to: '/dashboard/profile', label: 'My Profile', icon: User },
  ];

  const linkVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
      className="p-6 h-full flex flex-col justify-between bg-white dark:bg-zinc-900 shadow-xl border-r border-gray-200 dark:border-zinc-800"
    >
      <ul className="space-y-3">
        {navLinks.map((link) => (
          <motion.li key={link.to} variants={linkVariants}>
            <NavLink
              to={link.to}
              end={link.end}
              onClick={onLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-4 p-4 rounded-xl font-semibold text-lg transition-colors duration-300 transform hover:bg-green-50 dark:hover:bg-zinc-800 ${
                  isActive
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                    : 'text-gray-600 dark:text-gray-400'
                }`
              }
            >
              <link.icon className="w-6 h-6" />
              <span>{link.label}</span>
            </NavLink>
          </motion.li>
        ))}
      </ul>

      {/* --- Logout Button --- */}
      <motion.div variants={linkVariants}>
        <Link
          to="/"
          onClick={handleLogout}
          className="flex items-center gap-4 w-full p-4 rounded-xl font-semibold text-lg text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/50 hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-300"
        >
          <LogOut className="w-6 h-6" />
          <span>Log Out</span>
        </Link>
      </motion.div>
    </motion.nav>
  );
};

export default Sidebar;
