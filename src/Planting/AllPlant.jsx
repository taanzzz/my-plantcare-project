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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Plants</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr className="bg-green-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Watering</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plants.map(plant => (
              <tr key={plant._id}>
                <td className="border p-2">{plant.name}</td>
                <td className="border p-2">{plant.category}</td>
                <td className="border p-2">{plant.wateringFrequency}</td>
                <td className="border p-2">
                  <Link to={`/plants/${plant._id}`} className="text-blue-600 underline">
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
