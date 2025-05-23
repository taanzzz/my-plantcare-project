import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FaLeaf, FaTint, FaUser } from 'react-icons/fa';
import { Link } from 'react-router';


const AllPlantDetails = () => {
  const [plants, setPlants] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${baseUrl}/plants`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch plants');
        return res.json();
      })
      .then(data => setPlants(data))
      .catch(err => console.error(err));
  }, []);

  const sortedPlants = [...plants].sort((a, b) => {
    if (sortBy === 'careLevel') {
      const order = { Easy: 1, Moderate: 2, Difficult: 3 };
      return order[a.careLevel] - order[b.careLevel];
    }
    if (sortBy === 'lastWatered') {
      return new Date(b.lastWateredDate) - new Date(a.lastWateredDate);
    }
    return 0;
  });

  return (
    <section className="px-4 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">🌿 Featured Plants</h2>

      
      <div className="mb-8 flex justify-center">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select select-bordered dark:bg-gray-900 dark:text-white"
        >
          <option value="">Sort By</option>
          <option value="careLevel">Care Level</option>
          <option value="lastWatered">Last Watered Date</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPlants.slice(0, 6).map((plant, index) => (
          <div
            key={plant._id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-105"
          >
            <img src={plant.image} alt={plant.name} className="w-full h-auto" />
            <div className="p-5">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">{plant.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-2">
                <FaLeaf className="text-green-500" /> {plant.category}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-2">
                <FaTint className="text-blue-400" /> Water {plant.wateringFrequency}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last watered {formatDistanceToNow(new Date(plant.lastWateredDate), { addSuffix: true })}
              </p>
              <div className="mt-3 text-sm flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <FaUser className='text-blue-500' /> {plant.userName}
              </div>
              <div className="mt-4">
                <Link
                  to={`/plants/${plant._id}`}
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllPlantDetails;
