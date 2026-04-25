import React from 'react';
import { Home, Search, Library, Menu } from 'lucide-react';

const BottomNav = ({ activeView, setView, toggleSidebar }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', ariaLabel: 'Home page' },
    { id: 'search', icon: Search, label: 'Search', ariaLabel: 'Search songs' },
    { id: 'library', icon: Library, label: 'Library', ariaLabel: 'Your library' },
  ];

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => setView(item.id)}
            aria-label={item.ariaLabel}
            aria-current={activeView === item.id ? 'page' : undefined}
            role="tab"
            tabIndex={activeView === item.id ? 0 : -1}
          >
            <Icon size={24} className="nav-icon" aria-hidden="true" />
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
      <button 
        className="nav-item menu-item"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
        role="tab"
        tabIndex={-1}
      >
        <Menu size={24} className="nav-icon" aria-hidden="true" />
        <span className="nav-label">Menu</span>
      </button>
    </nav>
  );
};

export default BottomNav;
