import React, { useContext, useEffect, useRef, useState } from "react";
import plantImage from "../../assets/bg.png"; 
import { NavLink, useNavigate } from "react-router-dom"; 
import { AuthContext } from './../AuthContext/AuthContext';
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import ToggleTheme from './../ToggleTheme/ToggleTheme';
import MyProfile from './../../Page/MyProfile/MyProfile'; 
import { AiFillHome, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {  MdEmail,  MdOutlineEco } from "react-icons/md";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaChevronDown, FaUserPlus, FaSeedling } from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";


const mobileMenuVariants = {
  hidden: { x: "-100%", opacity: 0, transition: { type: "tween", duration: 0.3, ease: "easeIn" } },
  visible: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3, ease: "easeOut" } },
};


const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
};

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const navigate = useNavigate();
  const moreMenuRef = useRef(null);

  
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
  }, [navigate]);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  
  const NavLinkItem = ({ to, children, icon: Icon, isDropdown = false }) => (
    <NavLink
      to={to}
      onClick={() => {
        setMobileMenuOpen(false);
        setMoreMenuOpen(false);
      }}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg text-base font-medium transition-colors duration-200 ${
          isDropdown ? 'w-full px-3 py-2 text-sm' : 'px-4 py-2'
        } ${
          isActive
            ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
            : "text-gray-600 hover:bg-gray-100 hover:text-green-700 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-green-400"
        }`
      }
    >
      <Icon className="text-xl" />
      <span>{children}</span>
    </NavLink>
  );

  
  const primaryNavLinks = (
    <nav className="flex flex-col lg:flex-row gap-2 lg:gap-4 lg:items-center">
      <NavLinkItem to="/" icon={AiFillHome}>Home</NavLinkItem>
      <NavLinkItem to="/all-plants" icon={FaSeedling}>All Plants</NavLinkItem>
      {user && (
        <>
          <NavLinkItem to="/dashboard" icon={MdOutlineEco}>Dashboard</NavLinkItem>
        </>
      )}
    </nav>
  );

  
  const secondaryNavLinks = (
    <div className="flex flex-col gap-1">
      <NavLinkItem to="/about" icon={BsFillInfoCircleFill} isDropdown={true}>About Us</NavLinkItem>
      <NavLinkItem to="/contact" icon={MdEmail} isDropdown={true}>Contact Us</NavLinkItem>
    </div>
  );

  return (
    
    <header className="fixed top-0 left-0 right-0 z-[999]">
      
      <div className="px-4 md:px-12 bg-white/70 dark:bg-gray-800/60 backdrop-blur-lg border-b border-gray-200/80 dark:border-gray-700/60 shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between h-16">
          
          <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={plantImage} alt="Logo" loading="lazy" className="w-11 h-11 rounded-full shadow-md" />
            <span className="select-none font-extrabold tracking-tight text-xl sm:text-2xl">
              <span className="text-green-700 dark:text-green-400">Plant</span>
              <span className="text-gray-800 dark:text-white">Care</span>
            </span>
          </NavLink>

          
          <div className="hidden lg:flex items-center gap-4">
            {primaryNavLinks}
            
            
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                <span>More</span>
                <FaChevronDown className={`w-3 h-3 transition-transform ${moreMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {moreMenuOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-2"
                  >
                    {secondaryNavLinks}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          
          <div className="flex items-center gap-3">
            <ToggleTheme />
            {user ? (
              <MyProfile user={user} />
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <NavLink to="/login" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-green-600 dark:text-green-400 bg-green-100/50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/60 rounded-lg transition-colors">
                  <RiLoginBoxLine /> Login
                </NavLink>
                <NavLink to="/register" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 rounded-lg transition-colors">
                  <FaUserPlus /> Register
                </NavLink>
              </div>
            )}
            
            
            <div className="lg:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg focus:outline-none" aria-label="Toggle menu">
                {mobileMenuOpen ? <AiOutlineClose className="w-6 h-6" /> : <AiOutlineMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div variants={mobileMenuVariants} initial="hidden" animate="visible" exit="hidden" className="lg:hidden absolute top-full left-0 w-full mt-2">
            <div className="mx-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl">
              {primaryNavLinks}
              
              <div className="my-3 border-t border-gray-200 dark:border-gray-700"></div>

              {secondaryNavLinks}
              
              {!user && (
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <NavLink to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-green-600 dark:text-green-400 bg-green-100/50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/60 rounded-lg transition-colors">
                    <RiLoginBoxLine /> Login
                  </NavLink>
                  <NavLink to="/register" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 rounded-lg transition-colors">
                    <FaUserPlus /> Register
                  </NavLink>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;