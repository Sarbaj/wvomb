import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
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
          {navItems.map((item) => (
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
            {navItems.map((item) => (
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
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
