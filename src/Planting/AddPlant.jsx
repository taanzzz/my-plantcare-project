import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './../Component/AuthContext/AuthContext';
import { CalendarDays, Leaf, PlusCircle } from 'lucide-react';


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
    <div className="max-w-4xl mx-auto p-6 mt-8 rounded-2xl shadow-xl bg-base-100 dark:bg-neutral text-base-content transition-all duration-300">
      <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-8 flex items-center gap-3">
        <Leaf className="text-green-500 fill-green-300 dark:text-green-300" /> Add a New Plant 🌱
      </h2>
      <form onSubmit={handleAddPlant} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" name="image" placeholder="Image URL" className="input input-bordered w-full" required />
          <input type="text" name="name" placeholder="Plant Name" className="input input-bordered w-full" required />

          <select name="category" className="select select-bordered w-full" required>
            <option value="">Select Category</option>
            <option value="Succulent">Succulent</option>
            <option value="Fern">Fern</option>
            <option value="Flowering">Flowering</option>
          </select>

          <select name="careLevel" className="select select-bordered w-full" required>
            <option value="">Select Care Level</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Difficult">Difficult</option>
          </select>

          <input type="text" name="wateringFrequency" placeholder="Watering Frequency (e.g. every 3 days)" className="input input-bordered w-full" required />
          <input type="text" name="healthStatus" placeholder="Health Status" className="input input-bordered w-full" required />
        </div>

        <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full h-24" required />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label"><CalendarDays className="mr-2 text-gray-400 dark:text-white" /> Last Watered Date</label>
            <input type="date" name="lastWateredDate" className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="label"><CalendarDays className="mr-2 text-gray-400 dark:text-white" /> Next Watering Date</label>
            <input type="date" name="nextWateringDate" className="input input-bordered w-full" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" value={user?.email || ''} readOnly className="input input-bordered w-full " />
          <input type="text" value={user?.displayName || ''} readOnly className="input input-bordered w-full " />
        </div>

        <button type="submit" disabled={loading} className="btn btn-success w-full text-lg tracking-wide shadow-md">
          {loading ? 'Submitting...' : <span className="flex items-center justify-center gap-2"><PlusCircle className='text-white' /> Add Plant</span>}
        </button>
      </form>
    </div>
  );
};

export default AddPlant;
