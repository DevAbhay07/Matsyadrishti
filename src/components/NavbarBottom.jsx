import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icons from './Icons';

const NavbarBottom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    {
      path: '/about',
      icon: 'Info',
      label: 'About',
      description: 'Learn more'
    },
    {
      path: '/profile',
      icon: 'User',
      label: 'Profile',
      description: 'Your account'
    },
    {
      path: '/history',
      icon: 'Clock',
      label: 'History',
      description: 'Past scans'
    },
    {
      path: '/help',
      icon: 'Question',
      label: 'Help',
      description: 'Support & FAQ'
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Ocean themed tooltip */}
            {/* Ocean themed tooltip */}
      {hoveredItem && (
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-40">
          <div className="px-3 py-2 rounded-lg shadow-lg" style={{
            background: 'var(--white-ocean)',
            border: '1px solid var(--border-light)',
            backdropFilter: 'blur(10px)'
          }}>
            <div className="text-xs font-medium" style={{ color: 'var(--primary-blue-dark)' }}>
              {hoveredItem.label}
            </div>
          </div>
          {/* Ocean themed tooltip arrow */}
          <div className="w-2 h-2 transform rotate-45 mx-auto -mt-1" style={{
            background: 'var(--white-ocean)',
            border: '1px solid var(--border-light)',
            borderTop: 'none',
            borderLeft: 'none'
          }}></div>
        </div>
      )}

      {/* Modern floating navigation bar with enhanced glassmorphism */}
      <nav className="nav-dock floating-nav">
        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
          {/* First two nav items with modern styling */}
          {navItems.slice(0, 2).map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`nav-item-modern ${
                isActive(item.path) 
                  ? 'active' 
                  : ''
              }`}
            >
              {React.createElement(Icons[item.icon], { 
                className: `w-5 h-5 transition-all duration-300 ${
                  isActive(item.path) ? 'text-blue-600' : 'text-white'
                }`,
                style: { color: isActive(item.path) ? '#3B82F6' : '#FFFFFF' }
              })}
            </button>
          ))}
          
          {/* Enhanced home button with special styling */}
          <button
            onClick={() => navigate('/')}
            className={`nav-item-home ${
              location.pathname === '/' 
                ? 'active' 
                : ''
            }`}
          >
            <Icons.Home className={`w-6 h-6 transition-all duration-300 ${
              location.pathname === '/' ? 'text-white' : 'text-white'
            }`} 
            style={{ color: '#FFFFFF' }}
            />
          </button>
          
          {/* Last two nav items with modern styling */}
          {navItems.slice(2, 4).map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`nav-item-modern ${
                isActive(item.path) 
                  ? 'active' 
                  : ''
              }`}
            >
              {React.createElement(Icons[item.icon], { 
                className: `w-5 h-5 transition-all duration-300 ${
                  isActive(item.path) ? 'text-blue-600' : 'text-white'
                }`,
                style: { color: isActive(item.path) ? '#3B82F6' : '#FFFFFF' }
              })}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavbarBottom;