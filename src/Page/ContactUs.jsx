import React, { useState } from 'react';
import { MapPin, Mail, Phone, Send, User, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners'; 

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success('Your message has been sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' }); 
    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="min-h-screen py-20 px-4 md:px-10 bg-gray-50 dark:bg-zinc-950 transition-colors duration-500 flex items-center justify-center">
      <motion.div
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        <div className="flex flex-col justify-center">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 mb-6 drop-shadow-sm"
            variants={itemVariants}
          >
            Get in Touch
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-xl"
            variants={itemVariants}
          >
            We'd love to hear from you! Send us a message or find our contact information below.
          </motion.p>

          <motion.div variants={containerVariants} className="space-y-8">
            <motion.div className="flex items-start gap-5" variants={itemVariants}>
              <div className="flex-shrink-0 p-4 bg-green-100 dark:bg-green-900 rounded-full shadow-lg">
                <MapPin className="w-8 h-8 text-green-700 dark:text-green-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Our Address</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  12/A, Road No. 13 <br />
                  Dhanmondi, Dhaka-1209 <br />
                  Bangladesh
                </p>
              </div>
            </motion.div>

            <motion.div className="flex items-start gap-5" variants={itemVariants}>
              <div className="flex-shrink-0 p-4 bg-blue-100 dark:bg-blue-900 rounded-full shadow-lg">
                <Mail className="w-8 h-8 text-blue-700 dark:text-blue-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Email Us</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  <a href="mailto:info@plantcarebd.com" className="hover:underline">info@plantcarebd.com</a> <br />
                  <a href="mailto:support@plantcarebd.com" className="hover:underline">support@plantcarebd.com</a>
                </p>
              </div>
            </motion.div>

            <motion.div className="flex items-start gap-5" variants={itemVariants}>
              <div className="flex-shrink-0 p-4 bg-purple-100 dark:bg-purple-900 rounded-full shadow-lg">
                <Phone className="w-8 h-8 text-purple-700 dark:text-purple-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Call Us</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  +880 1234 567 890 <br />
                  +880 9876 543 210
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        
        <motion.div
          className="bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-200/60 dark:border-zinc-800/60 transition-all duration-300"
          variants={itemVariants}
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8 text-center">
            Send us a Message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label htmlFor="name" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold mb-2">
                <User size={20} /> Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-4 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold mb-2">
                <Mail size={20} /> Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full p-4 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold mb-2">
                <MessageSquare size={20} /> Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                placeholder="Write your message here..."
                className="w-full p-4 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300 resize-none"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-lg font-bold text-white bg-green-600 rounded-xl shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500/50 transition-all duration-300 transform hover:scale-[1.01] flex items-center justify-center gap-3"
            >
              {loading ? (
                <ClipLoader color="#fff" size={24} />
              ) : (
                <>
                  <Send className="w-6 h-6" /> Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactUs;