import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FaLeaf, FaTint, FaCalendarAlt, FaWater, FaHeartbeat, FaLevelUpAlt, FaUser } from 'react-icons/fa';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { SyncLoader } from 'react-spinners'; // You need to install react-spinners: npm install react-spinners

const PlantDetails = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/plants/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch plant details');
        }
        return res.json();
      })
      .then(data => {
        setPlant(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Could not load plant details. Please try again.');
        setLoading(false);
      });
  }, [id, baseUrl]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] dark:bg-zinc-900 transition-colors duration-500">
        <SyncLoader color="#10B981" size={15} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[50vh] dark:bg-zinc-900 transition-colors duration-500">
        <p className="text-red-600 dark:text-red-400 font-semibold">{error}</p>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="flex justify-center items-center h-[50vh] dark:bg-zinc-900 transition-colors duration-500">
        <p className="text-gray-500 dark:text-gray-400">Plant not found.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-16 px-4 md:px-10 lg:px-20 bg-gray-50 dark:bg-zinc-950 transition-colors duration-500 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 shadow-3xl rounded-3xl overflow-hidden border border-gray-200/60 dark:border-zinc-800/60 transition-all duration-500 transform hover:scale-[1.01] hover:shadow-cyan-400/30 relative"
      >
        {/* Background gradient for aesthetic appeal */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-green-50/50 via-transparent to-blue-50/50 dark:from-green-900/30 dark:via-transparent dark:to-blue-900/30 transition-colors duration-500"></div>
        
        {/* Main Content */}
        <div className="relative z-10 p-6 md:p-8"> {/* Reduced padding for a more compact view */}
          <div className="w-full h-56 md:h-72 lg:h-[400px] overflow-hidden rounded-2xl mb-6 shadow-2xl"> {/* Reduced image height */}
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
            />
          </div>
          
          <div className="space-y-4"> {/* Reduced spacing */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight leading-tight">
              {plant.name}
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed border-b border-gray-200 dark:border-zinc-700 pb-4">
              {plant.description || 'No description available for this plant.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-800 dark:text-gray-200"> {/* Adjusted grid and gap */}
              <div className="flex items-center gap-3 bg-gray-100 dark:bg-zinc-800 p-3 rounded-xl shadow-inner">
                <FaLeaf className="text-green-500 text-2xl" />
                <div>
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400">Category</p>
                  <p className="font-semibold text-base">{plant.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-100 dark:bg-zinc-800 p-3 rounded-xl shadow-inner">
                <FaLevelUpAlt className="text-purple-500 text-2xl" />
                <div>
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400">Care Level</p>
                  <p className="font-semibold text-base">{plant.careLevel}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-100 dark:bg-zinc-800 p-3 rounded-xl shadow-inner">
                <FaWater className="text-blue-500 text-2xl" />
                <div>
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400">Watering</p>
                  <p className="font-semibold text-base">{plant.wateringFrequency}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-100 dark:bg-zinc-800 p-3 rounded-xl shadow-inner">
                <FaCalendarAlt className="text-orange-500 text-2xl" />
                <div>
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400">Last Watered</p>
                  <p className="font-semibold text-base">{formatDate(plant.lastWateredDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-100 dark:bg-zinc-800 p-3 rounded-xl shadow-inner">
                <FaCalendarAlt className="text-red-500 text-2xl" />
                <div>
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400">Next Watering</p>
                  <p className="font-semibold text-base">{formatDate(plant.nextWateringDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-100 dark:bg-zinc-800 p-3 rounded-xl shadow-inner">
                <FaHeartbeat className="text-rose-500 text-2xl" />
                <div>
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400">Health Status</p>
                  <p className="font-semibold text-base">{plant.healthStatus}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-100 dark:bg-zinc-800 p-3 rounded-xl shadow-inner col-span-1 sm:col-span-2 lg:col-span-3">
                <FaUser className="text-sky-500 text-2xl" />
                <div>
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400">Added By</p>
                  <p className="font-semibold text-base">{plant.userName} ({plant.userEmail})</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PlantDetails;