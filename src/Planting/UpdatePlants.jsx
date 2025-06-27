import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { Leaf, Image, Info, CalendarDays, BarChart, Sun, Droplets, Edit, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const UpdatePlants = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${baseUrl}/plants/${id}`)
      .then(res => res.json())
      .then(data => setPlant(data))
      .catch(err => console.error(err));
  }, [id, baseUrl]);

  const handleChange = e => {
    const { name, value } = e.target;
    setPlant(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    fetch(`${baseUrl}/plants/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plant),
    })
      .then(res => {
        if (res.ok) {
          Swal.fire('Updated!', 'Plant info updated successfully!', 'success')
            .then(() => navigate('/my-plants'));
        } else {
          throw new Error('Update failed');
        }
      })
      .catch(err => {
        Swal.fire('Error!', 'Failed to update plant.', 'error');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!plant) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] dark:bg-zinc-950 transition-colors duration-500">
        <Loader2 className="animate-spin text-green-500" size={50} />
      </div>
    );
  }

  return (
    <section className="min-h-screen py-16 px-4 md:px-10 bg-gray-50 dark:bg-zinc-950 transition-colors duration-500 flex items-center justify-center">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl w-full mx-auto p-8 md:p-12 bg-white dark:bg-zinc-900 shadow-3xl rounded-3xl border border-gray-200/60 dark:border-zinc-800/60 transition-all duration-300"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 mb-10 text-center flex items-center justify-center gap-4">
          <Edit className="w-10 h-10 text-green-500" />
          Update Plant
        </h2>

        {/* --- Form Fields Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image URL */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium mb-2 text-sm md:text-base">
              <Image className="w-5 h-5 text-sky-500" /> Image URL
            </label>
            <input
              name="image"
              value={plant.image}
              onChange={handleChange}
              className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
              placeholder="Image URL"
              required
            />
          </div>

          {/* Plant Name */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium mb-2 text-sm md:text-base">
              <Leaf className="w-5 h-5 text-green-500" /> Plant Name
            </label>
            <input
              name="name"
              value={plant.name}
              onChange={handleChange}
              className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
              placeholder="Plant Name"
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium mb-2 text-sm md:text-base">
              <Info className="w-5 h-5 text-purple-500" /> Category
            </label>
            <select
              name="category"
              value={plant.category}
              onChange={handleChange}
              className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
            >
              <option value="Succulent">Succulent</option>
              <option value="Fern">Fern</option>
              <option value="Flowering">Flowering</option>
            </select>
          </div>

          {/* Care Level */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium mb-2 text-sm md:text-base">
              <BarChart className="w-5 h-5 text-orange-500" /> Care Level
            </label>
            <select
              name="careLevel"
              value={plant.careLevel}
              onChange={handleChange}
              className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
            >
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Difficult">Difficult</option>
            </select>
          </div>
          
          {/* Watering Frequency */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium mb-2 text-sm md:text-base">
              <Droplets className="w-5 h-5 text-blue-500" /> Watering Frequency
            </label>
            <input
              name="wateringFrequency"
              value={plant.wateringFrequency}
              onChange={handleChange}
              className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
              placeholder="e.g., every 7 days"
              required
            />
          </div>

          {/* Health Status */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium mb-2 text-sm md:text-base">
              <Sun className="w-5 h-5 text-yellow-500" /> Health Status
            </label>
            <input
              name="healthStatus"
              value={plant.healthStatus}
              onChange={handleChange}
              className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
              placeholder="e.g., Healthy"
              required
            />
          </div>

          {/* Last Watered Date */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium mb-2 text-sm md:text-base">
              <CalendarDays className="w-5 h-5 text-red-500" /> Last Watered Date
            </label>
            <input
              type="date"
              name="lastWateredDate"
              value={plant.lastWateredDate}
              onChange={handleChange}
              className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
              required
            />
          </div>

          {/* Next Watering Date */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium mb-2 text-sm md:text-base">
              <CalendarDays className="w-5 h-5 text-green-500" /> Next Watering Date
            </label>
            <input
              type="date"
              name="nextWateringDate"
              value={plant.nextWateringDate}
              onChange={handleChange}
              className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium mb-2 text-sm md:text-base">
            <Info className="w-5 h-5 text-gray-500" /> Description
          </label>
          <textarea
            name="description"
            value={plant.description}
            onChange={handleChange}
            className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300 resize-none"
            placeholder="Provide a detailed description of the plant..."
            rows="4"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 py-4 text-lg font-bold text-white bg-green-600 rounded-xl shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500/50 transition-all duration-300 transform hover:scale-[1.01] flex items-center justify-center gap-3"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <>
              <Edit className="w-6 h-6" /> Update Plant
            </>
          )}
        </button>
      </motion.form>
    </section>
  );
};

export default UpdatePlants;