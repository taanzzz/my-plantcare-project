import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FaLeaf, FaTint, FaUser, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router'; 

const AllPlantDetails = () => {
  const [plants, setPlants] = useState([]);
  const [displayedCount, setDisplayedCount] = useState(6); 
  const [sortBy, setSortBy] = useState('');
  const baseUrl = import.meta.env.VITE_API_URL;

  
  const [initialCardCount, setInitialCardCount] = useState(6);

  useEffect(() => {
    
    const updateCardCount = () => {
      if (window.innerWidth < 640) { 
        setInitialCardCount(4); 
      } else if (window.innerWidth >= 640 && window.innerWidth < 1024) { 
        setInitialCardCount(6); 
      } else { 
        setInitialCardCount(6); 
      }
    };

    window.addEventListener('resize', updateCardCount);
    updateCardCount(); 
    return () => window.removeEventListener('resize', updateCardCount);
  }, []);

  useEffect(() => {
    
    setDisplayedCount(initialCardCount);
  }, [initialCardCount]);


  
  useEffect(() => {
    fetch(`${baseUrl}/plants`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch plants');
        return res.json();
      })
      .then(data => setPlants(data))
      .catch(err => console.error(err));
  }, [baseUrl]);

  
  const sortedPlants = [...plants].sort((a, b) => {
    if (sortBy === 'careLevel') {
      const order = { Easy: 1, Moderate: 2, Difficult: 3 };
      
      const careLevelA = order[a.careLevel] || 99; 
      const careLevelB = order[b.careLevel] || 99;
      return careLevelA - careLevelB;
    }
    if (sortBy === 'lastWatered') {
      
      const dateA = new Date(a.lastWateredDate).getTime() || 0;
      const dateB = new Date(b.lastWateredDate).getTime() || 0;
      return dateB - dateA;
    }
    return 0;
  });
  
  const handleViewAll = () => {
    setDisplayedCount(plants.length);
  };

  const isViewAllShown = displayedCount < plants.length;

  return (
    <section className="px-4 py-10 mt-8 max-w-7xl mx-auto dark:bg-zinc-900 bg-white rounded-2xl shadow-2xl transition-colors">
      
      <h2 className="text-4xl font-extrabold text-center text-zinc-900 dark:text-green-400 mb-8 tracking-tight">
        <span className="text-green-600 dark:text-white">🌿</span> Featured Plants
      </h2>

      
      <div className="mb-10 flex justify-center">
        <div className="relative inline-block w-full max-w-xs">
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full py-3 px-4 pr-10 rounded-xl bg-zinc-100 dark:bg-gray-800 text-zinc-800 dark:text-white border border-zinc-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none transition-colors"
            >
                <option value="">Sort by...</option>
                <option value="careLevel">Care Level</option>
                <option value="lastWatered">Last Watered Date</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-700 dark:text-zinc-300">
                <FaChevronDown className="w-4 h-4" />
            </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-fr">
        {sortedPlants.slice(0, displayedCount).map((plant, index) => (
          <div
            key={plant._id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl border border-zinc-200 dark:border-zinc-700 flex flex-col h-full"
          >
            <div className="w-full h-48 md:h-56 overflow-hidden">
                <img 
                    src={plant.image} 
                    alt={plant.name} 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" 
                />
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-green-300 truncate">{plant.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm line-clamp-2">
                    {plant.description || 'No description available for this plant.'}
                </p>
                <div className="space-y-1 text-sm text-gray-700 dark:text-gray-400 font-medium">
                    <p className="flex items-center gap-2">
                        <FaLeaf className="text-green-600 dark:text-green-400" />
                        <span className="font-semibold">Category:</span> {plant.category}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaTint className="text-blue-500 dark:text-blue-300" />
                        <span className="font-semibold">Watering:</span> {plant.wateringFrequency}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaUser className='text-purple-600 dark:text-purple-400' />
                        <span className="font-semibold">Added by:</span> {plant.userName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Last watered {plant.lastWateredDate ? formatDistanceToNow(new Date(plant.lastWateredDate), { addSuffix: true }) : 'N/A'}
                    </p>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  to={`/plants/${plant._id}`}
                  className="w-full inline-block text-center bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      
      {isViewAllShown && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleViewAll}
            className="flex items-center gap-2 bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
          >
            Show All ({plants.length - displayedCount} more)
            <FaChevronDown />
          </button>
        </div>
      )}

      
      {plants.length === 0 && (
        <div className="text-center py-10 text-zinc-500 dark:text-zinc-400">
          <p className="text-lg font-semibold">No featured plants available right now.</p>
        </div>
      )}
    </section>
  );
};

export default AllPlantDetails;