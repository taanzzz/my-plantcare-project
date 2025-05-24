import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';

const UpdatePlants = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${baseUrl}/plants/${id}`)
      .then(res => res.json())
      .then(data => setPlant(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setPlant(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
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
      });
  };

  if (!plant) return <p className="p-6">Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mt-10 mx-auto p-6 bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl transition-all duration-300"
    >
      <h2 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-white text-center">Update Plant Info</h2>

      <input
        name="name"
        value={plant.name}
        onChange={handleChange}
        className="input mb-4 w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Plant Name"
        required
      />
      <input
        name="image"
        value={plant.image}
        onChange={handleChange}
        className="input mb-4 w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Image URL"
        required
      />

      <select
        name="category"
        value={plant.category}
        onChange={handleChange}
        className="input mb-4 w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="succulent">Succulent</option>
        <option value="fern">Fern</option>
        <option value="flowering">Flowering</option>
      </select>

      <select
        name="careLevel"
        value={plant.careLevel}
        onChange={handleChange}
        className="input mb-4 w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="easy">Easy</option>
        <option value="moderate">Moderate</option>
        <option value="difficult">Difficult</option>
      </select>

      <input
        name="wateringFrequency"
        value={plant.wateringFrequency}
        onChange={handleChange}
        className="input mb-4 w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Watering Frequency"
        required
      />
      <input
        type="date"
        name="lastWateredDate"
        value={plant.lastWateredDate}
        onChange={handleChange}
        className="input mb-4 w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="date"
        name="nextWateringDate"
        value={plant.nextWateringDate}
        onChange={handleChange}
        className="input mb-4 w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        name="healthStatus"
        value={plant.healthStatus}
        onChange={handleChange}
        className="input mb-4 w-full px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Health Status"
        required
      />
      <textarea
        name="description"
        value={plant.description}
        onChange={handleChange}
        className="input mb-6 w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
        placeholder="Description"
        rows="4"
      />

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-all duration-200"
      >
        Update Plant
      </button>
    </form>
  );
};

export default UpdatePlants;
