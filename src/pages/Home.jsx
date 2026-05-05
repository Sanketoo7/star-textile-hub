import { useState, useMemo, useEffect } from 'react';
import { manufacturers } from '../data/products';
import ManufacturerCard from '../components/ProductCard';
import StarLogo from '../components/StarLogo';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...new Set(manufacturers.map(m => m.category))];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredManufacturers = useMemo(() => {
    return manufacturers.filter(manufacturer => {
      const matchesSearch = manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           manufacturer.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || manufacturer.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>

      {/* Premium Header */}
      <div className="relative z-20">
        <div className="container mx-auto px-4 py-12">
          <div className={`text-center ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}>
            {/* Star Logo and Branding */}
            <div className="flex items-center justify-center mb-8 space-x-6">
              {/* Simple Star Logo */}
              <div className="relative">
                <StarLogo size="large" />
              </div>
              
              {/* Clean Branding */}
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  STAR
                  <span className="text-gray-600 font-light ml-3">Textile Hub</span>
                </h1>
                <p className="text-gray-600 text-lg">
                  Premium Manufacturer Directory
                </p>
              </div>
            </div>

            {/* Clean Search */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search manufacturers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all duration-200"
                />
                
                {/* Search Icon */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Category Navigation */}
      <div className="relative z-20">
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-wrap gap-3 justify-center items-center">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Manufacturers Grid */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className={`text-center mb-12 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4">
              {searchTerm ? `SEARCH RESULTS: ${filteredManufacturers.length}` : `${selectedCategory} MANUFACTURERS`}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full animate-pulse"></div>
          </div>

          {filteredManufacturers.length === 0 ? (
            <div className={`text-center py-20 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
              <div className="inline-flex items-center justify-center w-32 h-32 bg-red-500/20 rounded-full mb-8 border border-red-500/50">
                <svg className="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-red-400 text-2xl mb-6 font-mono">NO MANUFACTURERS FOUND</div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-black px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/50"
              >
                RESET SEARCH
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredManufacturers.map((manufacturer, index) => (
                <ManufacturerCard key={manufacturer.id} manufacturer={manufacturer} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Premium Footer */}
      <div className="relative z-20">
        <div className="bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">STAR Textile Hub</h3>
                <p className="text-gray-600">
                  Premium Manufacturer Directory
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{manufacturers.length}</div>
                  <div className="text-gray-500 text-sm">Manufacturers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">50+</div>
                  <div className="text-gray-500 text-sm">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">100%</div>
                  <div className="text-gray-500 text-sm">Verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
