import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './../Component/AuthContext/AuthContext';
import { CalendarDays, Leaf, PlusCircle } from 'lucide-react';
import { ClipLoader } from 'react-spinners';

const AddPlant = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL;

  const handleAddPlant = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const newPlant = {
      image: form.image.value,
      name: form.name.value,
      category: form.category.value,
      description: form.description.value,
      careLevel: form.careLevel.value,
      wateringFrequency: form.wateringFrequency.value,
      lastWateredDate: form.lastWateredDate.value,
      nextWateringDate: form.nextWateringDate.value,
      healthStatus: form.healthStatus.value,
      userEmail: user?.email,
      userName: user?.displayName,
    };

    try {
      const res = await fetch(`${baseUrl}/plants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlant),
      });

      const data = await res.json();
      if (data.insertedId || data.acknowledged) {
        toast.success('✅ Plant added successfully!');
        form.reset();
        navigate('/my-plants');
      } else {
        toast.error('❌ Failed to add plant');
      }
    } catch (err) {
      console.error(err);
      toast.error('❌ Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen py-16 px-4 md:px-10 bg-gray-50 dark:bg-zinc-950 transition-colors duration-500 flex items-center justify-center">
      <div className="max-w-5xl mx-auto w-full p-8 md:p-12 rounded-3xl shadow-3xl bg-white dark:bg-zinc-900 border border-gray-200/60 dark:border-zinc-800/60 transition-all duration-300">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-50 mb-6 sm:mb-8 md:mb-10 text-center flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
  <Leaf className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 text-green-500 fill-green-300 dark:text-green-400 dark:fill-green-600" />
  Add a New Plant
</h2>

        <form onSubmit={handleAddPlant} className="space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <input type="text" name="image" placeholder="Image URL (e.g., https://example.com/plant.jpg)" className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300" required />
            <input type="text" name="name" placeholder="Plant Name (e.g., Monstera Deliciosa)" className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300" required />
            <select name="category" className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300" defaultValue="" required>
              <option value="" disabled hidden>Select Category</option>
              <option value="Succulent">Succulent</option>
              <option value="Fern">Fern</option>
              <option value="Flowering">Flowering</option>
            </select>
            <select name="careLevel" className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300" defaultValue="" required>
              <option value="" disabled hidden>Select Care Level</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Difficult">Difficult</option>
            </select>
            <input type="text" name="wateringFrequency" placeholder="Watering Frequency (e.g., every 7 days)" className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300" required />
            <input type="text" name="healthStatus" placeholder="Health Status (e.g., Healthy, Needs attention)" className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300" required />
          </div>

          <textarea name="description" placeholder="Provide a detailed description of the plant..." rows="3" className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300 resize-none" required />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium mb-2 text-sm md:text-base">
                <CalendarDays className="w-5 h-5 text-green-500" /> Last Watered Date
              </label>
              <input type="date" name="lastWateredDate" className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300" required />
            </div>
            <div>
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium mb-2 text-sm md:text-base">
                <CalendarDays className="w-5 h-5 text-red-500" /> Next Watering Date
              </label>
              <input type="date" name="nextWateringDate" className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300" required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-gray-700 dark:text-gray-300 font-medium mb-2 text-sm md:text-base">User Email</label>
              <input type="text" value={user?.email || ''} readOnly className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-200 dark:bg-zinc-700 text-gray-500 dark:text-zinc-400 cursor-not-allowed" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 dark:text-gray-300 font-medium mb-2 text-sm md:text-base">User Name</label>
              <input type="text" value={user?.displayName || ''} readOnly className="w-full p-3.5 border border-gray-300 dark:border-zinc-700 rounded-xl bg-gray-200 dark:bg-zinc-700 text-gray-500 dark:text-zinc-400 cursor-not-allowed" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 text-lg font-bold text-white bg-green-600 rounded-xl shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500/50 transition-all duration-300 transform hover:scale-[1.01] flex items-center justify-center gap-3">
            {loading ? (
              <ClipLoader color="#fff" size={24} />
            ) : (
              <>
                <PlusCircle className="w-6 h-6" /> Add Plant
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddPlant;