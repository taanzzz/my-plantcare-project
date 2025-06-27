import { useEffect } from 'react';
import 'aos/dist/aos.css';
import Aos from 'aos';
import { motion } from 'framer-motion';
import { FaHandHoldingWater, FaLeaf, FaSeedling } from 'react-icons/fa';

const WhyPlantsMatter = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className="py-16 px-4 md:px-10 dark:bg-zinc-900 bg-gray-50 transition-colors duration-500"
      data-aos="fade-up"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-50 mb-4">
          Why Plant Care Matters?
        </h2>
        <p className="mb-12 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          Caring for plants is more than a hobby — it's a way to connect with nature, reduce stress, purify air, and build a green environment at home. Explore why consistent plant care improves both plant life and human wellness.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 text-left">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-zinc-800 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-zinc-700 transition-all duration-300"
            data-aos="zoom-in"
          >
            <FaLeaf className="text-emerald-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Cleaner Air</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Houseplants act as natural air purifiers, removing toxins and refreshing your space with oxygen.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-zinc-800 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-zinc-700 transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <FaSeedling className="text-lime-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Improved Mood</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Being around plants has been shown to reduce anxiety, increase happiness, and improve mental focus.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-zinc-800 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-zinc-700 transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <FaHandHoldingWater className="text-blue-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Daily Mindfulness</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Regular plant care builds mindful habits, patience, and responsibility — leading to better self-care too.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default WhyPlantsMatter;