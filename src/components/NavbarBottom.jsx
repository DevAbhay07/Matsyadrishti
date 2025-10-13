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

      {/* Modern floating navigation bar */}
      <nav className="nav-dock">
        <div className="flex items-center justify-center space-x-1 sm:space-x-3">
          {/* First two nav items with modern styling */}
          {navItems.slice(0, 2).map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`nav-item ${
                isActive(item.path) 
                  ? 'active' 
                  : ''
              }`}
            >
              {React.createElement(Icons[item.icon], { className: "w-4 h-4" })}
            </button>
          ))}
          
          {/* Modern home button with special styling */}
          <button
            onClick={() => navigate('/')}
            className={`nav-item ${
              location.pathname === '/' 
                ? 'active' 
                : ''
            }`}
          >
            <Icons.Home className="w-5 h-5" />
          </button>
          
          {/* Last two nav items with modern styling matching first two */}
          {navItems.slice(2, 4).map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`nav-item ${
                isActive(item.path) 
                  ? 'active' 
                  : ''
              }`}
            >
              {React.createElement(Icons[item.icon], { className: "w-4 h-4" })}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavbarBottom;