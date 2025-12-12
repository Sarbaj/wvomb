import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_URL}/api/services`);
      if (response.ok) {
        const data = await response.json();
        setServices(data.slice(0, 6)); // Limit to 6 services for dropdown
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { 
      path: '/services', 
      label: 'Services',
      dropdown: services.length > 0 ? [
        ...services.map(service => ({
          path: `/services/${service._id}`,
          label: service.title
        })),
        { path: '/services', label: 'View All Services', divider: true }
      ] : null
    },
    { 
      label: 'Business Sale/Purchase',
      dropdown: [
        { path: '/sell-business', label: 'Sell Business' },
        { path: '/buy-business', label: 'Buy Business' }
      ]
    },
    { path: '/learning-centre', label: 'Learning Centre' },
    { path: '/insights', label: 'Insights' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#F2F2F2]"
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
        <Link to="/" className="text-2xl tracking-tight">
          WVOMB<span className="text-[#8A8A8A]">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item, index) => (
            item.dropdown ? (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => {
                  if (item.label === 'Business Sale/Purchase') {
                    setBusinessDropdownOpen(true);
                  } else if (item.label === 'Services') {
                    setServicesDropdownOpen(true);
                  }
                }}
                onMouseLeave={() => {
                  if (item.label === 'Business Sale/Purchase') {
                    setBusinessDropdownOpen(false);
                  } else if (item.label === 'Services') {
                    setServicesDropdownOpen(false);
                  }
                }}
              >
                <Link
                  to={item.path || '#'}
                  className={`flex items-center gap-1 text-sm tracking-wide transition-colors ${
                    (item.label === 'Business Sale/Purchase' && (location.pathname === '/sell-business' || location.pathname === '/buy-business')) ||
                    (item.label === 'Services' && location.pathname === '/services')
                      ? 'text-black'
                      : 'text-[#8A8A8A] hover:text-black'
                  }`}
                >
                  {item.label}
                  <ChevronDown size={16} className={`transition-transform ${
                    (item.label === 'Business Sale/Purchase' && businessDropdownOpen) ||
                    (item.label === 'Services' && servicesDropdownOpen)
                      ? 'rotate-180' : ''
                  }`} />
                </Link>

                <AnimatePresence>
                  {((item.label === 'Business Sale/Purchase' && businessDropdownOpen) ||
                    (item.label === 'Services' && servicesDropdownOpen)) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute top-full left-0 mt-2 bg-white border border-[#E5E5E5] rounded-lg shadow-lg py-2 z-50 ${
                        item.label === 'Services' ? 'min-w-[220px]' : 'min-w-[180px]'
                      }`}
                    >
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <div key={dropdownItem.path || dropdownIndex}>
                          {dropdownItem.divider && (
                            <div className="border-t border-[#E5E5E5] my-2" />
                          )}
                          <Link
                            to={dropdownItem.path}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              dropdownItem.divider 
                                ? 'font-medium text-[#520052] hover:bg-[#F2F2F2]'
                                : location.pathname === dropdownItem.path
                                ? 'text-black bg-[#F2F2F2]'
                                : 'text-[#8A8A8A] hover:text-black hover:bg-[#F2F2F2]'
                            }`}
                          >
                            {dropdownItem.label}
                          </Link>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {((item.label === 'Business Sale/Purchase' && (location.pathname === '/sell-business' || location.pathname === '/buy-business')) ||
                  (item.label === 'Services' && location.pathname === '/services')) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-black"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm tracking-wide transition-colors ${
                  location.pathname === item.path
                    ? 'text-black'
                    : 'text-[#8A8A8A] hover:text-black'
                }`}
              >
                {item.label}

                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-black"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-black"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-[#F2F2F2]"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {navItems.map((item, index) => (
              item.dropdown ? (
                <div key={index} className="flex flex-col gap-2">
                  <span className="text-lg py-2 text-[#8A8A8A] font-medium">{item.label}</span>
                  {item.dropdown.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.path}
                      to={dropdownItem.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-base py-2 pl-4 ${
                        location.pathname === dropdownItem.path
                          ? 'text-black'
                          : 'text-[#8A8A8A]'
                      }`}
                    >
                      {dropdownItem.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg py-2 ${
                    location.pathname === item.path
                      ? 'text-black'
                      : 'text-[#8A8A8A]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
