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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Update Plant Info</h2>

      <input name="name" value={plant.name} onChange={handleChange} className="input mb-2 w-full" placeholder="Plant Name" required />
      <input name="image" value={plant.image} onChange={handleChange} className="input mb-2 w-full" placeholder="Image URL" required />

      <select name="category" value={plant.category} onChange={handleChange} className="input mb-2 w-full">
        <option value="succulent">Succulent</option>
        <option value="fern">Fern</option>
        <option value="flowering">Flowering</option>
      </select>

      <select name="careLevel" value={plant.careLevel} onChange={handleChange} className="input mb-2 w-full">
        <option value="easy">Easy</option>
        <option value="moderate">Moderate</option>
        <option value="difficult">Difficult</option>
      </select>

      <input name="wateringFrequency" value={plant.wateringFrequency} onChange={handleChange} className="input mb-2 w-full" placeholder="Watering Frequency" required />
      <input type="date" name="lastWateredDate" value={plant.lastWateredDate} onChange={handleChange} className="input mb-2 w-full" />
      <input type="date" name="nextWateringDate" value={plant.nextWateringDate} onChange={handleChange} className="input mb-2 w-full" />
      <input name="healthStatus" value={plant.healthStatus} onChange={handleChange} className="input mb-2 w-full" placeholder="Health Status" required />
      <textarea name="description" value={plant.description} onChange={handleChange} className="input mb-2 w-full" placeholder="Description" />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update Plant</button>
    </form>
  );
};

export default UpdatePlants;
