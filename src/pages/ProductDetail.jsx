import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { manufacturers } from '../data/products';
import StarLogo from '../components/StarLogo';

const ManufacturerDetail = () => {
  const { id } = useParams();
  const [manufacturer, setManufacturer] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const foundManufacturer = manufacturers.find(m => m.id === parseInt(id));
    setManufacturer(foundManufacturer);
    setIsLoaded(true);
  }, [id]);

  if (!manufacturer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="relative">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">
              Manufacturer Not Found
            </h1>
            <div className="text-gray-600 mb-8">The manufacturer you're looking for doesn't exist in our database.</div>
          </div>
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Manufacturers</span>
          </Link>
        </div>
      </div>
    );
  }

  // Generate image gallery
  const imageUrls = [
    manufacturer.image,
    `https://picsum.photos/seed/${manufacturer.name}1/800/600`,
    `https://picsum.photos/seed/${manufacturer.name}2/800/600`,
    `https://picsum.photos/seed/${manufacturer.name}3/800/600`,
    `https://picsum.photos/seed/${manufacturer.name}4/800/600`,
    `https://picsum.photos/seed/${manufacturer.name}5/800/600`
  ];

  const sections = [
    { id: 'overview', label: 'Company Overview', icon: '�' },
    { id: 'gallery', label: 'Photo Gallery', icon: '📸' },
    { id: 'materials', label: 'Materials', icon: '🧵' },
    { id: 'production', label: 'Production', icon: '⚙️' },
    { id: 'certifications', label: 'Certifications', icon: '🏆' },
    { id: 'specialties', label: 'Specialties', icon: '⭐' },
    { id: 'contact', label: 'Contact', icon: '📞' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Back</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <StarLogo size="small" />
              <h1 className="text-xl font-bold text-gray-900">STAR Textile Hub</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`text-left ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {manufacturer.name}
              </h1>
              <div className="text-lg text-gray-600 mb-4">
                {manufacturer.type}
              </div>
              <div className="text-gray-700 leading-relaxed max-w-lg">
                {manufacturer.description}
              </div>
            </div>
            
            <div className={`relative ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}>
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src={imageUrls[currentImageIndex]} 
                  alt={manufacturer.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-3 font-medium text-sm transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-gray-900 text-white border-b-2 border-gray-900'
                    : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900'
                }`}
              >
                {section.icon} {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-12">
        {/* Company Overview Section */}
        {activeSection === 'overview' && (
          <div className={`animate-fade-in ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Company Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Established</span>
                    <span className="font-medium text-gray-900">Since {manufacturer.established}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium text-gray-900">{manufacturer.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Production Capacity</span>
                    <span className="font-medium text-gray-900">{manufacturer.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium text-gray-900">{manufacturer.category}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Key Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Years in Business</span>
                    <span className="font-medium text-gray-900">{new Date().getFullYear() - parseInt(manufacturer.established)}+ years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Certifications</span>
                    <span className="font-medium text-gray-900">{manufacturer.certifications.length} active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Material Types</span>
                    <span className="font-medium text-gray-900">{manufacturer.materials.length} different</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Photo Gallery Section */}
        {activeSection === 'gallery' && (
          <div className={`animate-fade-in ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Photo Gallery</h2>
              <p className="text-gray-600">Browse through our facility and production images</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {imageUrls.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <img 
                      src={imageUrl} 
                      alt={`${manufacturer.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    {/* Image Number */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                      {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Materials Section */}
        {activeSection === 'materials' && (
          <div className={`animate-fade-in ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Materials</h2>
              <p className="text-gray-600">Premium materials we work with</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {manufacturer.materials.map((material, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900">{material}</h4>
                      <p className="text-sm text-gray-600">Premium quality material</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Production Section */}
        {activeSection === 'production' && (
          <div className={`animate-fade-in ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Production Capacity</h2>
              <p className="text-gray-600">Our manufacturing capabilities</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Daily Output</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{manufacturer.capacity}</div>
                  <div className="text-gray-600">Square meters per day</div>
                  
                  <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-900 mb-3">Production Lines</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Weaving</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Knitting</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Finishing</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '90%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quality Standards</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Defect Rate</span>
                      <span className="font-medium text-green-600">0.02%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">QC Pass Rate</span>
                      <span className="font-medium text-green-600">98.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lead Time</span>
                      <span className="font-medium text-blue-600">2-3 weeks</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Certifications Section */}
        {activeSection === 'certifications' && (
          <div className={`animate-fade-in ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Certifications</h2>
              <p className="text-gray-600">Industry-recognized quality standards</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {manufacturer.certifications.map((cert, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{cert}</h4>
                    <div className="text-sm text-gray-600">
                      <div>Issued: {manufacturer.established}</div>
                      <div>Valid until: {parseInt(manufacturer.established) + 10}</div>
                      <div className="text-green-600 font-medium">Active</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Specialties Section */}
        {activeSection === 'specialties' && (
          <div className={`animate-fade-in ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Specialties</h2>
              <p className="text-gray-600">What makes us unique in the industry</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {manufacturer.specialties.map((specialty, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-purple-600 font-bold text-xl">★</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{specialty}</h4>
                    <div className="text-sm text-gray-600">
                      <div>Expert level: Advanced</div>
                      <div className="text-purple-600 font-medium">Premium service</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <div className={`animate-fade-in ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h2>
              <p className="text-gray-600">Reach out to discuss your requirements</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Phone</h4>
                  <div className="text-blue-600 font-medium">{manufacturer.contact.phone}</div>
                  <div className="text-sm text-gray-600">Call us directly</div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0l7.89-5.26a2 2 0 002.22 0L30 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Email</h4>
                  <div className="text-purple-600 font-medium">{manufacturer.contact.email}</div>
                  <div className="text-sm text-gray-600">Send us your requirements</div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9 9m0 0c1.657 0 3.094.505 4.238.797l1.998 1.998h-3.192c-1.144 0-2.231-.292-3.082-.797M21 12v6m-9-6v6m0 0v6m0-6v6" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Website</h4>
                  <div className="text-green-600 font-medium">{manufacturer.contact.website}</div>
                  <div className="text-sm text-gray-600">Visit our online portal</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManufacturerDetail;
