import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, HeartHandshake } from 'lucide-react';

const AboutUs = () => {
  const imageOne = 'https://i.ibb.co/s95mwhRB/20250627-012601.jpg';
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
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

  return (
    <section className="py-20 px-4 md:px-10 bg-gray-50 dark:bg-zinc-950 transition-colors duration-500">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        <div className="text-center mb-20">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-gray-50 drop-shadow-sm mb-4 leading-tight"
            variants={itemVariants}
          >
            Cultivating a Greener World
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            At PlantCare, our mission is to empower plant lovers everywhere. We believe that caring for plants is a rewarding journey that enriches our lives and our environment.
          </motion.p>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            className="rounded-3xl shadow-3xl overflow-hidden border-4 border-white dark:border-zinc-800"
            variants={itemVariants}
          >
            <img
              src={imageOne}
              alt="Our Story"
              className="w-full h-96 object-cover object-center transform transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
          <div className="flex flex-col justify-center lg:px-8">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6 leading-tight"
              variants={itemVariants}
            >
              Our Story
            </motion.h2>
            <motion.p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed space-y-4" variants={itemVariants}>
              <p>
                Founded by a group of passionate plant enthusiasts, PlantCare was born from a simple idea: to make plant care easy and accessible for everyone. We know how challenging it can be to keep track of watering schedules, light needs, and fertilization cycles. That's why we created a digital tool to simplify the process.
              </p>
              <p>
                From a small project to a thriving community, we've grown alongside our users and their plants. We are dedicated to providing a platform that not only helps you track your plants but also connects you with a community of fellow growers.
              </p>
            </motion.p>
          </div>
        </div>

        
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4"
            variants={itemVariants}
          >
            Our Core Values
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Our commitment is rooted in three key principles that guide everything we do.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          
          <motion.div
            className="bg-white dark:bg-zinc-900 rounded-3xl p-10 shadow-2xl border border-gray-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-cyan-400/30 hover:scale-[1.02]"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full mx-auto mb-6 shadow-inner">
              <GraduationCap className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4 text-center">Education</h3>
            <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed">
              We empower our community with knowledge, providing reliable guides and tips to help every plant thrive.
            </p>
          </motion.div>

          
          <motion.div
            className="bg-white dark:bg-zinc-900 rounded-3xl p-10 shadow-2xl border border-gray-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-cyan-400/30 hover:scale-[1.02]"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-6 shadow-inner">
              <Users className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4 text-center">Community</h3>
            <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed">
              We foster a supportive space where plant lovers can share experiences, tips, and inspiration.
            </p>
          </motion.div>

          
          <motion.div
            className="bg-white dark:bg-zinc-900 rounded-3xl p-10 shadow-2xl border border-gray-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-cyan-400/30 hover:scale-[1.02]"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center w-20 h-20 bg-emerald-100 dark:bg-emerald-900 rounded-full mx-auto mb-6 shadow-inner">
              <HeartHandshake className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4 text-center">Well-being</h3>
            <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed">
              We promote the therapeutic benefits of plants, helping you find joy and mindfulness through care.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;