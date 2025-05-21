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
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={plant.image} alt={plant.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-2">{plant.name}</h2>
          <p><strong>Category:</strong> {plant.category}</p>
          <p><strong>Care Level:</strong> {plant.careLevel}</p>
          <p><strong>Watering:</strong> {plant.wateringFrequency}</p>
          <p><strong>Last Watered:</strong> {plant.lastWateredDate}</p>
          <p><strong>Next Watering:</strong> {plant.nextWateringDate}</p>
          <p><strong>Health Status:</strong> {plant.healthStatus}</p>
          <p><strong>Added By:</strong> {plant.userName} ({plant.userEmail})</p>
          <p className="mt-4">{plant.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
