import { useEffect, useState } from 'react';
import { Link } from 'react-router';


const AllPlants = () => {
  const [plants, setPlants] = useState([]);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${baseUrl}/plants`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch plants');
        }
        return res.json();
      })
      .then(data => setPlants(data))
      .catch(err => console.error(err));
  }, []);

   return (
    <div className="p-4 md:p-8 mt-8 max-w-6xl mx-2 sm:mx-auto dark:bg-zinc-900 bg-white rounded-xl shadow-lg transition-colors">
      <h2 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-white border-b border-zinc-200 dark:border-zinc-700 pb-2">
        All Plants
      </h2>

      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-green-100 dark:bg-green-900 text-zinc-800 dark:text-zinc-200">
              <th className="p-4 text-left border-b border-zinc-300 dark:border-zinc-700">Name</th>
              <th className="p-4 text-left border-b border-zinc-300 dark:border-zinc-700">Category</th>
              <th className="p-4 text-left border-b border-zinc-300 dark:border-zinc-700">Watering</th>
              <th className="p-4 text-left border-b border-zinc-300 dark:border-zinc-700">Actions</th>
            </tr>
          </thead>

          <tbody>
            {plants.map(plant => (
              <tr
                key={plant._id}
                className="hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-700"
              >
                <td className="p-4">{plant.name}</td>
                <td className="p-4">{plant.category}</td>
                <td className="p-4">{plant.wateringFrequency}</td>
                <td className="p-4">
                  <Link
                    to={`/plants/${plant._id}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPlants;
