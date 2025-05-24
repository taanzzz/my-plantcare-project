import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './../Component/AuthContext/AuthContext';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { Leaf, Pencil, Trash2 } from 'lucide-react';


const MyPlants = () => {
  const { user } = useContext(AuthContext);
  const [myPlants, setMyPlants] = useState([]);
  const navigate = useNavigate(); 

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
    <div className="p-4 md:p-8 mt-10 max-w-6xl mx-2 sm:mx-auto px-2 sm:px-6 dark:bg-zinc-900 bg-white rounded-xl shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <Leaf className="text-green-600 dark:text-green-400 fill-green-400" />
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">My Plants</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-green-100 dark:bg-green-900 text-zinc-800 dark:text-zinc-200 border-b border-zinc-300 dark:border-zinc-700">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {myPlants.length > 0 ? (
              myPlants.map((plant) => (
                <tr
                  key={plant._id}
                  className="hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border-b border-zinc-200 dark:border-zinc-700"
                >
                  <td className="p-3 text-zinc-700 dark:text-zinc-300">{plant.name}</td>
                  <td className="p-3">
                    <div className="flex  gap-4">
                      <button
                        onClick={() => handleUpdate(plant._id)}
                        className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <Pencil className='text-blue-600' size={18} /> Update
                      </button>
                      <button
                        onClick={() => handleDelete(plant._id)}
                        className="flex items-center gap-1 text-red-600 dark:text-red-400 hover:underline"
                      >
                        <Trash2 size={18} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  className="text-center py-6 text-zinc-500 dark:text-zinc-400"
                >
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
