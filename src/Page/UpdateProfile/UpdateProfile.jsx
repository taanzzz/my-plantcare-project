import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Component/AuthContext/AuthContext';
import { useNavigate } from 'react-router';
import { updateProfile } from 'firebase/auth';
import { UserCircle, Image, User, Save, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const UpdateProfile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(user, { displayName: name, photoURL });
      toast.success('✅ Profile updated successfully!');
      navigate('/user-profile'); // Navigate to the user profile page after update
    } catch (error) {
      toast.error('❌ Failed to update profile!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] py-16 px-4 dark:bg-zinc-950 transition-colors duration-500">
        <div className="text-center p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-800">
          <p className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-6">
            Please log in first to update your profile.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <User /> Login Now
          </button>
        </div>
      </div>
    );
  }

  const defaultPhoto = 'https://i.ibb.co/FbDdMYbZ/vecteezy-blue-profile-icon-36885313.png';
  const displayPhoto = photoURL || user.photoURL || defaultPhoto;

  return (
    <section className="min-h-screen py-16 px-4 md:px-10 bg-gray-50 dark:bg-zinc-950 transition-colors duration-500 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full mx-auto p-8 md:p-12 bg-white dark:bg-zinc-900 shadow-3xl rounded-3xl border border-gray-200/60 dark:border-zinc-800/60 transition-all duration-300 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 mb-10 text-center flex items-center justify-center gap-4">
          <UserCircle className="w-10 h-10 text-green-500" />
          Edit Profile
        </h2>

        {/* Live Photo Preview */}
        <div className="mb-10 flex flex-col items-center gap-4">
          <motion.img
            key={displayPhoto}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            src={displayPhoto}
            alt="User Avatar Preview"
            className="w-40 h-40 rounded-full object-cover border-4 border-green-500 dark:border-green-400 shadow-xl"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">Live Photo Preview</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Display Name Input */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium mb-2 text-sm md:text-base">
              <User className="w-5 h-5 text-green-500" /> Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
              required
            />
          </div>

          {/* Photo URL Input */}
          <div>
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium mb-2 text-sm md:text-base">
              <Image className="w-5 h-5 text-blue-500" /> Photo URL
            </label>
            <input
              type="url"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
              placeholder="https://your-photo-url.com"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-6 text-lg font-bold text-white bg-green-600 rounded-xl shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500/50 transition-all duration-300 transform hover:scale-[1.01] flex items-center justify-center gap-3"
          >
            {loading ? (
              <Loader2 className="animate-spin w-6 h-6" />
            ) : (
              <>
                <Save className="w-6 h-6" /> Save Changes
              </>
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default UpdateProfile;