import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './../Component/AuthContext/AuthContext';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { Leaf, Pencil, Trash2, LayoutGrid, Table, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipLoader } from 'react-spinners'; 

const MyPlants = () => {
  const { user } = useContext(AuthContext);
  const [myPlants, setMyPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('card'); 
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;

  const fetchMyPlants = () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`${baseUrl}/my-plants/${user.email}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch plants');
        return res.json();
      })
      .then(data => {
        setMyPlants(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        
      });
  };

  useEffect(() => {
    fetchMyPlants();
  }, [user, baseUrl]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This plant will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#EF4444', 
      cancelButtonColor: '#6B7280', 
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${baseUrl}/plants/${id}`, {
          method: 'DELETE',
        })
          .then(res => {
            if (res.ok) {
              Swal.fire('Deleted!', 'Your plant has been removed.', 'success');
              fetchMyPlants(); 
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
    navigate(`/update-plant/${id}`);
  };

  const handleViewDetails = (id) => {
    navigate(`/plants/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] dark:bg-zinc-950 transition-colors duration-500">
        <ClipLoader color="#10B981" size={50} />
      </div>
    );
  }

  return (
    <section className="min-h-screen py-16 px-4 md:px-10 bg-gray-50 dark:bg-zinc-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 flex items-center justify-center gap-4">
            <Leaf className="w-10 h-10 text-green-600 fill-green-300 dark:text-green-400 dark:fill-green-600" />
            My Plants
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Manage your collection of plants, track their progress, and keep them healthy.
          </p>
        </div>

        {myPlants.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl border border-gray-200 dark:border-zinc-800"
          >
            <p className="text-2xl font-semibold text-gray-500 dark:text-gray-400">
              You haven’t added any plants yet.
            </p>
            <p className="text-gray-400 dark:text-gray-500 mt-2">Add your first plant to get started!</p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <div className="flex justify-end mb-6 gap-3">
              <button
                onClick={() => setViewMode('card')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  viewMode === 'card'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-zinc-700'
                }`}
              >
                <LayoutGrid size={20} /> <span className='hidden sm:inline'>Card View</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  viewMode === 'table'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-zinc-700'
                }`}
              >
                <Table size={20} /> <span className='hidden sm:inline'>Table View</span>
              </button>
            </div>

            {viewMode === 'card' && (
              <motion.div
                key="card-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {myPlants.map((plant) => (
                  <motion.div
                    key={plant._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-cyan-400/30 hover:scale-[1.02]"
                  >
                    <div className="w-full h-56 overflow-hidden">
                      <img src={plant.image} alt={plant.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2 truncate">
                        {plant.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {plant.description || 'No description available.'}
                      </p>
                      <div className="mt-auto flex items-center justify-between gap-4">
                        <button
                          onClick={() => handleViewDetails(plant._id)}
                          className="flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                        >
                          <Eye size={16} /> View
                        </button>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleUpdate(plant._id)}
                            className="flex items-center gap-1 text-sm font-semibold text-green-600 dark:text-green-400 hover:underline transition-colors"
                          >
                            <Pencil size={16} /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(plant._id)}
                            className="flex items-center gap-1 text-sm font-semibold text-red-600 dark:text-red-400 hover:underline transition-colors"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {viewMode === 'table' && (
              <motion.div
                key="table-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="overflow-x-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-800"
              >
                <table className="min-w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 uppercase text-sm font-semibold tracking-wider">
                      <th className="p-4 text-left">Image</th>
                      <th className="p-4 text-left">Name</th>
                      <th className="p-4 text-left hidden md:table-cell">Category</th>
                      <th className="p-4 text-left hidden md:table-cell">Care Level</th>
                      <th className="p-4 text-left hidden lg:table-cell">Watering</th>
                      <th className="p-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myPlants.map((plant) => (
                      <tr
                        key={plant._id}
                        className="border-t border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
                      >
                        <td className="p-4">
                          <img src={plant.image} alt={plant.name} className="w-16 h-16 object-cover rounded-lg shadow-md" />
                        </td>
                        <td className="p-4 text-gray-800 dark:text-gray-200 font-semibold">{plant.name}</td>
                        <td className="p-4 text-gray-600 dark:text-gray-400 hidden md:table-cell">{plant.category}</td>
                        <td className="p-4 text-gray-600 dark:text-gray-400 hidden md:table-cell">{plant.careLevel}</td>
                        <td className="p-4 text-gray-600 dark:text-gray-400 hidden lg:table-cell">{plant.wateringFrequency}</td>
                        <td className="p-4">
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
                            <button
                               onClick={() => handleViewDetails(plant._id)}
                               className="flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                            >
                               <Eye size={16} /> View
                            </button>
                            <button
                              onClick={() => handleUpdate(plant._id)}
                              className="flex items-center gap-1 text-sm font-semibold text-green-600 dark:text-green-400 hover:underline"
                            >
                              <Pencil size={16} /> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(plant._id)}
                              className="flex items-center gap-1 text-sm font-semibold text-red-600 dark:text-red-400 hover:underline"
                            >
                              <Trash2 size={16} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default MyPlants;