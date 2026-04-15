import React from 'react';
import { Home, Search, Library, Menu } from 'lucide-react';

const BottomNav = ({ activeView, setView, toggleSidebar }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'library', icon: Library, label: 'Library' },
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => setView(item.id)}
          >
            <Icon size={24} />
            <span>{item.label}</span>
          </button>
        );
      })}
      <button className="nav-item" onClick={toggleSidebar}>
        <Menu size={24} />
        <span>Menu</span>
      </button>
    </div>
  );
};

export default BottomNav;
