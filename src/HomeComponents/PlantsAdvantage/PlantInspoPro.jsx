import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import Aos from 'aos';
import { motion } from 'framer-motion';

const PlantInspoPro = () => {
  const [inspoData, setInspoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Aos.init({ duration: 1200, once: true });

    fetch('/plantInspoData.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load JSON');
        return res.json();
      })
      .then((data) => {
        setInspoData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10 text-gray-500 dark:text-gray-400">Loading inspiration...</p>;
  if (error) return <p className="text-center text-red-600 py-10">Error: {error}</p>;

  return (
    <section className="relative w-full py-24 px-6 md:px-10 overflow-hidden bg-gray-50 dark:bg-zinc-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-50 drop-shadow-sm">
            🌱 Green Living Inspiration
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Discover how houseplants enhance wellness, focus, and beauty in your life.
          </p>
        </div>

        <div className="grid gap-8 md:gap-10 md:grid-cols-3">
          {inspoData.map((item) => (
            <motion.div
              key={item.id}
              data-aos="zoom-in-up"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="relative bg-white dark:bg-zinc-800 bg-opacity-70 dark:bg-opacity-70 backdrop-blur-lg border border-gray-200 dark:border-zinc-700 rounded-3xl shadow-2xl overflow-hidden hover:shadow-cyan-200/50 hover:shadow-lg hover:border-blue-400 duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover object-center"
              />
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-base">{item.desc}</p>
              </div>

              
              <motion.div
                className="absolute -top-4 -right-4 bg-gray-100 dark:bg-zinc-700 p-2 rounded-full shadow-lg"
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                🌿
              </motion.div>
            </motion.div>
          ))}
        </div>

        
        <div className="absolute w-72 h-72 bg-blue-100 dark:bg-sky-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse top-[-80px] left-[-80px]"></div>
        <div className="absolute w-72 h-72 bg-purple-100 dark:bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse bottom-[-80px] right-[-80px]"></div>
      </div>
    </section>
  );
};

export default PlantInspoPro;