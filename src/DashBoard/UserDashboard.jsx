import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import { useNavigate, Link } from 'react-router'; 
import {  PlusCircle, User, CalendarDays, TrendingUp, Layers, Book, ArrowRight, CalendarCheck2, CheckCircle } from 'lucide-react';
import { format, isFuture, isPast, isToday, parseISO } from 'date-fns';
import { AuthContext } from '../Component/AuthContext/AuthContext';
import Swal from 'sweetalert2'; 

const UserDashboard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [myPlants, setMyPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false); 
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;

  const fetchMyPlants = async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/my-plants/${user.email}`);
      if (!res.ok) throw new Error('Failed to fetch plants');
      const data = await res.json();
      setMyPlants(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPlants();
  }, [user, baseUrl]);

  
  const handleWaterPlant = async (plant) => {
    setUpdating(true);
    const today = new Date().toISOString().split('T')[0];
    
    const updatedPlant = {
      ...plant,
      lastWateredDate: today,
      
    };

    try {
      const res = await fetch(`${baseUrl}/plants/${plant._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPlant),
      });

      if (res.ok) {
        Swal.fire('Task Complete!', `${plant.name} has been watered.`, 'success');
        fetchMyPlants(); 
      } else {
        throw new Error('Update failed');
      }
    } catch (err) {
      Swal.fire('Error!', 'Failed to update plant.', 'error');
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };


  
  const totalPlants = myPlants.length;
  const plantsNeedingWater = myPlants.filter(plant => {
    if (!plant.nextWateringDate) return false;
    const nextDate = parseISO(plant.nextWateringDate);
    return isPast(nextDate) && !isToday(nextDate);
  }).length;

  const upcomingTasks = myPlants
    .filter(plant => {
      if (!plant.nextWateringDate) return false;
      const nextDate = parseISO(plant.nextWateringDate);
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
      return isFuture(nextDate) && nextDate <= sevenDaysFromNow;
    })
    .sort((a, b) => {
      const dateA = a.nextWateringDate ? parseISO(a.nextWateringDate).getTime() : Infinity;
      const dateB = b.nextWateringDate ? parseISO(b.nextWateringDate).getTime() : Infinity;
      return dateA - dateB;
    })
    .slice(0, 5);

  const recentPlants = [...myPlants]
    .sort((a, b) => {
      const dateA = a.addedDate ? parseISO(a.addedDate).getTime() : 0; 
      const dateB = b.addedDate ? parseISO(b.addedDate).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 4); 

  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  
  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-gray-50 dark:bg-zinc-950 transition-colors duration-500">
        <ClipLoader color="#10B981" size={50} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 px-4 dark:bg-zinc-950 transition-colors duration-500 text-center">
        <div className="max-w-lg p-10 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-zinc-800">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please log in to view your personal plant dashboard.
          </p>
          <Link to="/login" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
            <User /> Log In Now
          </Link>
        </div>
      </div>
    );
  }

  
  return (
    <section className="min-h-screen py-16 px-4 md:px-10 bg-gray-50 dark:bg-zinc-950 transition-colors duration-500">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
       
        <motion.div variants={itemVariants} className="mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-50 drop-shadow-sm leading-tight text-center lg:text-left">
            Welcome, <span className="text-green-600 dark:text-green-400">{user.displayName || 'Plant Lover'}!</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mt-2 text-center lg:text-left">
            Your personal plant care dashboard.
          </p>
        </motion.div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <motion.div variants={itemVariants} className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-green-400/30 hover:scale-[1.02]">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full shadow-inner">
                <Layers className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Total Plants</p>
                <h3 className="text-5xl font-extrabold text-gray-900 dark:text-gray-50">{totalPlants}</h3>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-yellow-400/30 hover:scale-[1.02]">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-full shadow-inner">
                <CalendarCheck2 className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Watering Due</p>
                <h3 className="text-5xl font-extrabold text-gray-900 dark:text-gray-50">{plantsNeedingWater}</h3>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-blue-400/30 hover:scale-[1.02]">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full shadow-inner">
                <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Upcoming Tasks</p>
                <h3 className="text-5xl font-extrabold text-gray-900 dark:text-gray-50">{upcomingTasks.length}</h3>
              </div>
            </div>
          </motion.div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-zinc-800 flex flex-col transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6 flex items-center gap-3">
              <CalendarDays className="w-7 h-7 text-green-500" /> Upcoming Care Schedule
            </h3>
            {upcomingTasks.length > 0 ? (
              <ul className="space-y-4">
                {upcomingTasks.map((plant, index) => (
                  <li key={plant._id} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-zinc-800 rounded-xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer" >
                    <div className="flex items-center gap-4">
                      <img src={plant.image} alt={plant.name} className="w-12 h-12 object-cover rounded-lg shadow-md flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{plant.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Watering needed on{' '}
                          <span className="font-bold text-green-600 dark:text-green-400">
                            {format(parseISO(plant.nextWateringDate), 'MMM dd')}
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleWaterPlant(plant)}
                      disabled={updating}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-green-500 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 transform hover:scale-105"
                    >
                      {updating ? <ClipLoader size={16} color="#fff" /> : <CheckCircle size={18} />}
                      <span className="hidden sm:inline-block">Watered</span>
                    </button>
                    
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                <Book className="w-16 h-16 mx-auto mb-4" />
                <p className="font-semibold">All your plants are happy!</p>
                <p className="text-sm">No care needed for upcoming days.</p>
              </div>
            )}
          </motion.div>

          
          <motion.div variants={itemVariants} className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-zinc-800 flex flex-col justify-between transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">Quick Actions</h3>
            <div className="space-y-4">
              
              <Link to="/dashboard/add-plant" className="w-full py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3">
                <PlusCircle size={20} /> Add New Plant
              </Link>
              <Link to="/dashboard/my-plants" className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3">
                <Layers size={20} /> View All My Plants
              </Link>
              <Link to="/dashboard/profile" className="w-full py-4 bg-purple-600 text-white font-bold rounded-xl shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3">
                <User size={20} /> My Profile
              </Link>
              
            </div>
          </motion.div>
        </div>

        
        {recentPlants.length > 0 && (
          <motion.div variants={itemVariants} className="mt-16">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8 text-center lg:text-left">
              Recently Added Plants
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {recentPlants.map(plant => (
                <motion.div
                  key={plant._id}
                  variants={itemVariants}
                  className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800 overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-lime-400/30 hover:-translate-y-1"
                  
                  onClick={() => navigate(`/dashboard/plants/${plant._id}`)}
                >
                  <img src={plant.image} alt={plant.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100 truncate">{plant.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{plant.careLevel} Care</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default UserDashboard;