import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './../Component/AuthContext/AuthContext';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';


const MyPlants = () => {
  const { user } = useContext(AuthContext);
  const [myPlants, setMyPlants] = useState([]);
  const navigate = useNavigate(); // ✅ navigation hook

const baseUrl = import.meta.env.VITE_API_URL;

  const fetchMyPlants = () => {
    fetch(`${baseUrl}/my-plants/${user.email}`)
      .then(res => res.json())
      .then(data => setMyPlants(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (user?.email) {
      fetchMyPlants();
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This plant will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${baseUrl}/plants/${id}`, {
          method: 'DELETE',
        })
          .then(res => {
            if (res.ok) {
              Swal.fire('Deleted!', 'Your plant has been removed.', 'success');
              fetchMyPlants(); // refresh list
            } else {
              throw new Error('Failed to delete');
            }
          })
          .catch((err) => {
            Swal.fire('Error!', 'Failed to delete plant.', 'error');
            console.error(err);
          });
      }
    });
  };

  const handleUpdate = (id) => {
    Swal.fire({
      icon: 'success',
      title: 'Redirecting...',
      text: 'You are being redirected to the update page.',
      timer: 1200,
      showConfirmButton: false,
    }).then(() => {
      navigate(`/update-plant/${id}`);
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Plants</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr className="bg-green-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myPlants.length > 0 ? (
              myPlants.map((plant) => (
                <tr key={plant._id}>
                  <td className="border p-2">{plant.name}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleUpdate(plant._id)}
                      className="mr-4 text-blue-600 underline"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(plant._id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-4 text-gray-500">
                  You haven’t added any plants yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPlants;
