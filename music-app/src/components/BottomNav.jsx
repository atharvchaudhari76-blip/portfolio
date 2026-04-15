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
        const active = activeView === item.id;
        return (
          <button
            key={item.id}
            className={`nav-item ${active ? 'active' : ''}`}
            onClick={() => setView(item.id)}
            style={{ cursor: 'pointer' }}
          >
            <item.icon
              size={22}
              strokeWidth={active ? 2.5 : 1.8}
              color={active ? 'white' : 'var(--text-muted)'}
            />
            <span style={{ fontSize: '10px' }}>{item.label}</span>
          </button>
        );
      })}
      <button
        className="nav-item"
        onClick={toggleSidebar}
        style={{ cursor: 'pointer' }}
      >
        <Menu size={22} strokeWidth={1.8} color="var(--text-muted)" />
        <span style={{ fontSize: '10px' }}>Menu</span>
      </button>
    </div>
  );
};

export default BottomNav;
