import { useState } from 'react';
import { Link } from 'react-router-dom';

const ManufacturerCard = ({ manufacturer, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Generate additional image URLs (using different seeds for variety)
  const imageUrls = [
    manufacturer.image,
    `https://picsum.photos/seed/${manufacturer.name}1/400/300`,
    `https://picsum.photos/seed/${manufacturer.name}2/400/300`,
    `https://picsum.photos/seed/${manufacturer.name}3/400/300`
  ];

  return (
    <Link to={`/manufacturer/${manufacturer.id}`} className="block">
      <div className={`group animate-slide-up stagger-${(index % 6) + 1}`}>
        {/* Premium Hotel Menu Card Design */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden">
          {/* Image Gallery */}
          <div className="relative h-56 overflow-hidden">
            <div className="relative h-full">
              {/* Main Image */}
              <img 
                src={imageUrls[currentImageIndex]} 
                alt={`${manufacturer.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              
              {/* Image Navigation */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-2">
                {/* Previous Button */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex((prev) => prev === 0 ? imageUrls.length - 1 : prev - 1);
                  }}
                  className="bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/80 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {/* Image Indicators */}
                <div className="flex space-x-1">
                  {imageUrls.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentImageIndex(i);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        i === currentImageIndex 
                          ? 'bg-white' 
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Next Button */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
                  }}
                  className="bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/80 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                {manufacturer.category}
              </span>
            </div>
            
            {/* Year Badge */}
            <div className="absolute top-4 right-4">
              <span className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                Since {manufacturer.established}
              </span>
            </div>
          </div>
          
          {/* Enhanced Content Area */}
          <div className="p-6 space-y-4">
            {/* Manufacturer Name */}
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
              {manufacturer.name}
            </h3>
            
            {/* Type */}
            <div className="text-sm text-gray-600 font-medium mb-3">
              {manufacturer.type}
            </div>
            
            {/* Description */}
            <div className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
              {manufacturer.description}
            </div>
            
            {/* Enhanced Key Information */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-sm mb-1">
                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-600 text-xs">Location</span>
                </div>
                <div className="text-gray-800 font-medium">{manufacturer.location}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-sm mb-1">
                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-gray-600 text-xs">Capacity</span>
                </div>
                <div className="text-gray-800 font-medium">{manufacturer.capacity}</div>
              </div>
            </div>
            
            {/* Enhanced Certifications */}
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-600 mb-2">Certifications</div>
              <div className="flex flex-wrap gap-2">
                {manufacturer.certifications.map((cert, i) => (
                  <span key={i} className="bg-blue-50 text-blue-800 px-3 py-1 rounded-lg text-xs font-medium border border-blue-200">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Enhanced Materials */}
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-600 mb-2">Materials</div>
              <div className="flex flex-wrap gap-2">
                {manufacturer.materials.map((material, i) => (
                  <span key={i} className="bg-green-50 text-green-800 px-3 py-1 rounded-lg text-xs font-medium border border-green-200">
                    {material}
                  </span>
                ))}
              </div>
            </div>
            
            {/* View Details Button */}
            <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
              <span>View Manufacturer Details</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ManufacturerCard;
