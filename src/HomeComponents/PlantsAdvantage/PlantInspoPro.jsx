import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import Aos from 'aos';
import { motion } from 'framer-motion';


const PlantInspoPro = () => {
  const [inspoData, setInspoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Aos.init({ duration: 1200 });

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

  if (loading) return <p className="text-center py-10 text-gray-500">Loading inspiration...</p>;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;

  return (
    <section className="relative w-full bg-gradient-to-br from-emerald-50 via-green-100 to-white py-24 px-6 md:px-20 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-extrabold text-emerald-700 drop-shadow-sm">
          🌱 Green Living Inspiration
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Discover how houseplants enhance wellness, focus, and beauty in your life.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        {inspoData.map((item) => (
          <motion.div
            key={item.id}
            data-aos="zoom-in-up"
            whileHover={{ scale: 1.03, rotate: 0.5 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="relative bg-white bg-opacity-60 backdrop-blur-xl border border-green-200 rounded-3xl shadow-2xl overflow-hidden hover:shadow-green-200 hover:shadow-lg hover:border-emerald-400 duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover object-center"
            />
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-emerald-800">{item.title}</h3>
              <p className="text-gray-700 text-sm">{item.desc}</p>
            </div>

            <motion.div
              className="absolute -top-4 -right-4 bg-green-200 p-2 rounded-full"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              🌿
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Background Animated Blobs */}
      <div className="absolute w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse top-[-80px] left-[-80px]"></div>
      <div className="absolute w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse bottom-[-80px] right-[-80px]"></div>
    </section>
  );
};

export default PlantInspoPro;
