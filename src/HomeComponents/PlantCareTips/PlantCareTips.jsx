import React, { useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import 'aos/dist/aos.css';
import { FaBug, FaLeaf, FaSeedling, FaSun, FaTint } from 'react-icons/fa';
import Aos from 'aos';
import { motion } from 'framer-motion';
import Tippy from '@tippyjs/react';

const tips = [
  {
    id: 1,
    icon: <FaTint className="text-blue-600 text-3xl" />,
    title: 'Water Regularly',
    description: 'Keep the soil evenly moist,but avoid waterlogging to prevent root rot.',
    tip: 'Water when the top 1-2 inches of soil feel dry. Use room temperature water.',
    aos: 'fade-up',
  },
  {
    id: 2,
    icon: <FaSun className="text-yellow-500 text-3xl" />,
    title: 'Provide Sunlight',
    description: 'Plants need light for photosynthesis, but not all require direct sunlight.',
    tip: 'Place near a window with bright, indirect light for 4-6 hours daily.',
    aos: 'zoom-in',
  },
  {
    id: 3,
    icon: <FaLeaf className="text-green-800 text-3xl" />,
    title: 'Prune Dead Leaves',
    description: 'Trimming improves airflow and redirects nutrients to healthier parts.',
    tip: 'Use sanitized scissors and cut close to the stem without damaging it.',
    aos: 'flip-left',
  },
  {
    id: 4,
    icon: <FaBug className="text-red-500 text-3xl" />,
    title: 'Check for Pests',
    description: 'Common pests include spider mites, aphids, and fungus gnats.',
    tip: 'Inspect weekly under leaves and soil surface. Neem oil works well as a natural treatment.',
    aos: 'flip-right',
  },
  {
    id: 5,
    icon: <FaSeedling className="text-lime-600 text-3xl" />,
    title: 'Fertilize Wisely',
    description: 'Fertilizer boosts growth, but overuse can damage roots.',
    tip: 'Use a balanced liquid fertilizer once a month during spring and summer.',
    aos: 'fade-up',
  },
  {
    id: 6,
    icon: <FaLeaf className="text-emerald-500 text-3xl" />,
    title: 'Repot When Needed',
    description: 'Outgrown roots need more space to thrive and absorb nutrients.',
    tip: 'Repot every 12–18 months or when roots grow out of drainage holes. Use fresh soil.',
    aos: 'zoom-in-up',
  },
];

const PlantCareTips = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="py-14 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🌱 Plant Care Guide
        </motion.h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tips.map((tip) => (
            <motion.div
              key={tip.id}
              data-aos={tip.aos}
              className="flex items-center gap-5 bg-white rounded-xl p-6 shadow-xl border-l-4 border-green-600 hover:scale-105 hover:shadow-green-300 transition duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <Tippy
                content={
                  <div className="bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg p-2 text-zinc-800 dark:text-zinc-200 shadow-md max-w-[220px] text-sm font-medium">
                    {tip.tip}
                  </div>
                }
                placement="right"
                theme="light-border"
                delay={[100, 0]}
                interactive={true}
                trigger="mouseenter focus"
                onShow={(instance) => {
                  const isTouch = window.matchMedia('(hover: none)').matches;
                  if (isTouch) instance.setProps({ trigger: 'click' });
                }}
              >
                <div className="cursor-help transition-transform duration-300 hover:scale-110">
                  {tip.icon}
                </div>
              </Tippy>
              <div>
                <h4 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">{tip.title}</h4>
                <p className="text-sm text-green-700">{tip.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlantCareTips;