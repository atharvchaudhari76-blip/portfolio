import React from 'react';
import { Home, Search, Library, LogOut, Music, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';

const Sidebar = ({ activeView, setView }) => {
  const { user, logout } = useAuth();
  const { library } = useAudio();

  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'library', icon: Library, label: 'Library' },
  ];

  return (
    <div className="sidebar" style={{
      width: '100%',
      height: '100%',
      background: 'var(--bg-sidebar)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '20px', fontWeight: 700 }}>
        <Music className="text-accent" color="var(--accent-primary)" />
        <span>AesthetiCore</span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '8px',
              background: activeView === item.id ? 'var(--bg-card)' : 'transparent',
              color: activeView === item.id ? 'var(--text-main)' : 'var(--text-muted)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '15px'
            }}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>

      {user && (
        <div className="glass" style={{ 
          padding: '16px', 
          borderRadius: '16px', 
          marginTop: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              background: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 600
            }}>
              {user.name?.[0].toUpperCase()}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.name}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Pro Member</div>
            </div>
          </div>
          <button 
            onClick={logout}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              color: '#f87171',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              padding: '4px'
            }}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
