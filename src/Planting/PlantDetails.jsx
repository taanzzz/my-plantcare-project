import { useEffect, useState } from 'react';
import { useParams } from 'react-router';


const PlantDetails = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${baseUrl}/plants/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch plant details');
        }
        return res.json();
      })
      .then(data => setPlant(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!plant) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-64  md:h-80"
        />
        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold text-zinc-800 dark:text-white">{plant.name}</h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            <strong className="text-zinc-900 dark:text-white">Category:</strong> {plant.category}
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            <strong className="text-zinc-900 dark:text-white">Care Level:</strong> {plant.careLevel}
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            <strong className="text-zinc-900 dark:text-white">Watering:</strong> {plant.wateringFrequency}
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            <strong className="text-zinc-900 dark:text-white">Last Watered:</strong> {plant.lastWateredDate}
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            <strong className="text-zinc-900 dark:text-white">Next Watering:</strong> {plant.nextWateringDate}
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            <strong className="text-zinc-900 dark:text-white">Health Status:</strong> {plant.healthStatus}
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            <strong className="text-zinc-900 dark:text-white">Added By:</strong> {plant.userName} ({plant.userEmail})
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">{plant.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
