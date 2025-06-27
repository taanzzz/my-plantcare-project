import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router';
import Navbar from '../Component/Navbar/Navbar';
import Footer from '../Component/Footer/Footer';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'tween', duration: 0.4 } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-500">
      
      <Navbar />

      
      <div className="flex flex-1 pt-16">
        
        
        <div className="hidden lg:block w-64 flex-shrink-0">
          <Sidebar onLinkClick={() => setIsSidebarOpen(false)} />
        </div>

        
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={sidebarVariants}
              className="fixed inset-x-0 bottom-0 z-50 h-3/4 max-h-[80vh] bg-white dark:bg-zinc-900 shadow-2xl rounded-t-3xl lg:hidden"
            >
             
              <Sidebar onLinkClick={() => setIsSidebarOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
          )}
        </AnimatePresence>
        
        
        <div className="lg:hidden fixed top-5 left-4 z-[1000]">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 shadow-md transition-colors"
          >
            {isSidebarOpen ? null : <Menu size={24} />}
          </button>
        </div>

       
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;