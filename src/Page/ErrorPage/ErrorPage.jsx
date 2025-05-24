import { Link } from "react-router";
import { motion } from 'framer-motion';


const ErrorPage = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden text-white">
      <video
  className="absolute top-0 left-0 w-full h-full object-cover z-0"
  autoPlay
  loop
  muted
  playsInline
>
  <source src="/error.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

      <div className="absolute inset-0 bg-black/60 z-10" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 flex flex-col justify-center items-center h-full text-center px-4"
      >
        <h1 className="text-6xl md:text-7xl font-extrabold mb-4">404</h1>
        <p className="text-xl md:text-2xl mb-6">Oops! This page is lost in the jungle 🌿</p>
        <Link
          to="/"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-lg transition duration-300"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
