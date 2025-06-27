import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router';
import { IoGrid, IoList } from 'react-icons/io5';
import { FaSort, FaSortAlphaDown, FaSortAlphaUp, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

const AllPlants = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef(null);

  const baseUrl = import.meta.env.VITE_API_URL;

  const spinnerStyle = `
    @keyframes spin-grow {
      0% { transform: rotate(0deg) scale(0.5); opacity: 0.5; }
      50% { transform: rotate(180deg) scale(1.1); opacity: 1; }
      100% { transform: rotate(360deg) scale(0.5); opacity: 0.5; }
    }
    .plant-spinner-svg {
      animation: spin-grow 2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
      transform-origin: center;
    }
    .dark .circle-path-dark-mode {
        stroke: #4ade80;
    }
  `;

  const PlantSpinner = () => (
    <>
      <style>{spinnerStyle}</style>
      <svg className="plant-spinner-svg w-20 h-20" viewBox="0 0 100 100">
        <circle
          className="stroke-green-600 dark:stroke-green-400 stroke-[4] stroke-linecap-round fill-none transition-colors duration-500"
          cx="50"
          cy="50"
          r="45"
        />
      </svg>
    </>
  );

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${baseUrl}/plants`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch plants');
        }
        return res.json();
      })
      .then(data => {
        setPlants(data);
        setFilteredPlants(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load plants. Please try again later.');
        setLoading(false);
      });
  }, [baseUrl]);

  useEffect(() => {
    let sorted = [...plants];
    switch (sortOption) {
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'category-asc':
        sorted.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'category-desc':
        sorted.sort((a, b) => b.category.localeCompare(a.category));
        break;
      case 'watering-asc':
        sorted.sort((a, b) => a.wateringFrequency - b.wateringFrequency);
        break;
      case 'watering-desc':
        sorted.sort((a, b) => b.wateringFrequency - a.wateringFrequency);
        break;
      default:
        break;
    }
    setFilteredPlants(sorted);
  }, [sortOption, plants]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setIsSortDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const handleSortChange = (option) => {
    setSortOption(option);
    setIsSortDropdownOpen(false);
  };

  const toggleViewMode = () => {
    setViewMode(prevMode => (prevMode === 'grid' ? 'table' : 'grid'));
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 dark:bg-zinc-900 bg-white transition-colors duration-500">
        <PlantSpinner />
        <p className="mt-4 text-green-700 dark:text-green-300 font-semibold text-lg animate-pulse">
          Sowing the seeds of beauty...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96 text-red-600 dark:text-red-400 dark:bg-zinc-900 bg-white">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 mt-8 max-w-7xl mx-2 sm:mx-auto dark:bg-zinc-900 bg-white rounded-2xl shadow-2xl transition-colors">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 border-b border-zinc-200 dark:border-zinc-700 pb-2 gap-4">
        <h2 className="text-3xl font-extrabold text-zinc-800 dark:text-white">
          Our Plant Collection
        </h2>

        
        <div className="flex items-center justify-between gap-4 w-full sm:w-auto">
            
            <div className="relative w-full sm:w-auto" ref={sortDropdownRef}>
                <button
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    className="flex items-center justify-center gap-2 py-2 px-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                >
                    <FaSort />
                    <span>Sort By</span>
                </button>
                {isSortDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-full sm:w-56 bg-white dark:bg-zinc-800 rounded-lg shadow-xl z-10 border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                        <div className="py-2">
                            <button onClick={() => handleSortChange('name-asc')} className="flex items-center w-full px-4 py-2 text-left text-zinc-700 dark:text-zinc-300 hover:bg-green-100 dark:hover:bg-zinc-700 transition-colors">
                                <FaSortAlphaDown className="mr-3 text-green-600" /> Name (A-Z)
                            </button>
                            <button onClick={() => handleSortChange('name-desc')} className="flex items-center w-full px-4 py-2 text-left text-zinc-700 dark:text-zinc-300 hover:bg-green-100 dark:hover:bg-zinc-700 transition-colors">
                                <FaSortAlphaUp className="mr-3 text-green-600" /> Name (Z-A)
                            </button>
                            <div className="my-1 border-t border-zinc-200 dark:border-zinc-700"></div>
                            <button onClick={() => handleSortChange('category-asc')} className="flex items-center w-full px-4 py-2 text-left text-zinc-700 dark:text-zinc-300 hover:bg-green-100 dark:hover:bg-zinc-700 transition-colors">
                                <FaSortAmountDown className="mr-3 text-green-600" /> Category (A-Z)
                            </button>
                            <button onClick={() => handleSortChange('category-desc')} className="flex items-center w-full px-4 py-2 text-left text-zinc-700 dark:text-zinc-300 hover:bg-green-100 dark:hover:bg-zinc-700 transition-colors">
                                <FaSortAmountUp className="mr-3 text-green-600" /> Category (Z-A)
                            </button>
                            <div className="my-1 border-t border-zinc-200 dark:border-zinc-700"></div>
                            <button onClick={() => handleSortChange('watering-asc')} className="flex items-center w-full px-4 py-2 text-left text-zinc-700 dark:text-zinc-300 hover:bg-green-100 dark:hover:bg-zinc-700 transition-colors">
                                <FaSortAmountDown className="mr-3 text-green-600" /> Watering (Low-High)
                            </button>
                            <button onClick={() => handleSortChange('watering-desc')} className="flex items-center w-full px-4 py-2 text-left text-zinc-700 dark:text-zinc-300 hover:bg-green-100 dark:hover:bg-zinc-700 transition-colors">
                                <FaSortAmountUp className="mr-3 text-green-600" /> Watering (High-Low)
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
            
            <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all duration-300 ${
                    viewMode === 'grid'
                        ? 'bg-green-600 text-white shadow-md'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                    title="Switch to Grid View"
                >
                    <IoGrid className="text-2xl" />
                </button>
                <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-md transition-all duration-300 ${
                    viewMode === 'table'
                        ? 'bg-green-600 text-white shadow-md'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                    title="Switch to Table View"
                >
                    <IoList className="text-2xl" />
                </button>
            </div>
        </div>
      </div>

      {plants.length === 0 ? (
        <div className="text-center py-10 text-zinc-500 dark:text-zinc-400">
          <p className="text-lg">No plants found. Check back later!</p>
        </div>
      ) : viewMode === 'grid' ? (
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {filteredPlants.map(plant => (
            <div
              key={plant._id}
              className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl overflow-hidden flex flex-col transition-transform transform hover:scale-[1.02] duration-300 border border-zinc-200 dark:border-zinc-700 h-full"
            >
              <img
                src={plant.image}
                alt={plant.name}
                className="w-full h-56 object-cover"
                loading="lazy"
              />
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-green-300 mb-2 truncate">
                    {plant.name}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3">
                    {plant.description || 'No description available.'}
                  </p>
                </div>
                <Link
                  to={`/plants/${plant._id}`}
                  className="w-full text-center py-2 mt-4 font-semibold rounded-lg transition-colors bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-inner">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-green-100 dark:bg-green-900 text-zinc-800 dark:text-zinc-200 font-bold border-b-2 border-green-200 dark:border-green-800">
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left hidden sm:table-cell">Category</th>
                <th className="p-4 text-left hidden md:table-cell">Watering</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlants.map(plant => (
                <tr
                  key={plant._id}
                  className="hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-700"
                >
                  <td className="p-4 w-20 h-20">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-4 font-semibold">{plant.name}</td>
                  <td className="p-4 hidden sm:table-cell">{plant.category}</td>
                  <td className="p-4 hidden md:table-cell">{plant.wateringFrequency}</td>
                  <td className="p-4">
                    <Link
                      to={`/plants/${plant._id}`}
                      className="inline-block py-2 px-4 rounded-lg text-white font-medium transition-colors bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllPlants;