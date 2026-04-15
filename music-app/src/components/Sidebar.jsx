import React from 'react';
import { Home, Search, Library, Music, Plus, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';

const Sidebar = ({ activeView, setView }) => {
  const { user, logout } = useAuth();
  const { library, playTrack, playlists, createPlaylist } = useAudio();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>

      {/* Nav Panel */}
      <div className="panel" style={{ padding: '16px 12px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 8px 20px 8px' }}>
          <div style={{
            width: '34px', height: '34px',
            background: 'var(--accent-gradient)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(168,85,247,0.4)',
            flexShrink: 0
          }}>
            <Music size={18} color="white" />
          </div>
          <span style={{
            fontFamily: 'Outfit', fontWeight: 800, fontSize: '18px',
            background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent', letterSpacing: '-0.3px'
          }}>
            AesthetiCore
          </span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navItems.map(({ id, icon: Icon, label }) => {
            const active = activeView === id;
            return (
              <button
                key={id}
                onClick={() => setView(id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '11px 14px', borderRadius: '10px',
                  background: active ? 'rgba(168,85,247,0.12)' : 'transparent',
                  color: active ? 'white' : 'var(--text-muted)',
                  border: active ? '1px solid rgba(168,85,247,0.2)' : '1px solid transparent',
                  cursor: 'pointer', fontWeight: 600, fontSize: '15px',
                  transition: 'all 0.2s ease', width: '100%', textAlign: 'left',
                  fontFamily: 'inherit'
                }}
                className="sidebar-nav-btn"
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                {label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Library Panel */}
      <div className="panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Library Header */}
        <div style={{ padding: '14px 16px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => setView('library')}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              background: 'transparent', border: 'none',
              color: activeView === 'library' ? 'white' : 'var(--text-muted)',
              fontWeight: 700, cursor: 'pointer', padding: '0',
              fontSize: '14px', fontFamily: 'inherit',
              transition: 'color 0.2s'
            }}
          >
            <Library size={20} strokeWidth={activeView === 'library' ? 2.5 : 2} />
            Your Library
          </button>
          <button
            onClick={() => createPlaylist()}
            style={{
              background: 'rgba(255,255,255,0.06)', border: 'none',
              color: 'var(--text-muted)', cursor: 'pointer',
              padding: '6px', borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            title="Create playlist"
            className="sidebar-icon-btn"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Filter pill */}
        <div style={{ padding: '0 12px 10px' }}>
          <div style={{
            display: 'inline-flex', background: 'rgba(255,255,255,0.07)',
            padding: '5px 12px', borderRadius: '20px',
            fontSize: '12px', fontWeight: 600, color: 'var(--text-main)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            Playlists & Tracks
          </div>
        </div>

        {/* Library list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px 8px' }}>
          {playlists.length > 0 && (
            <div style={{ marginBottom: '8px' }}>
              {playlists.map(playlist => (
                <div
                  key={playlist.id}
                  className="library-item"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '7px 8px', borderRadius: '8px', cursor: 'pointer',
                    transition: 'background 0.15s'
                  }}
                >
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '6px',
                    background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(34,211,238,0.3))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Music size={18} color="var(--text-muted)" />
                  </div>
                  <div style={{ overflow: 'hidden', flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {playlist.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                      Playlist • {playlist.tracks.length} songs
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {library.length > 0 ? (
            library.map(track => (
              <div
                key={track.id}
                onClick={() => playTrack(track, library)}
                className="library-item"
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '7px 8px', borderRadius: '8px', cursor: 'pointer',
                  transition: 'background 0.15s'
                }}
              >
                <img
                  src={track.thumbnail} alt=""
                  style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ overflow: 'hidden', flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {track.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                    Track • {track.artist}
                  </div>
                </div>
              </div>
            ))
          ) : playlists.length === 0 ? (
            <div style={{ padding: '24px 12px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '12px', lineHeight: 1.6 }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>🎵</div>
              Your library is quiet.<br />Start adding tracks!
            </div>
          ) : null}
        </div>

        {/* User Footer */}
        {user && (
          <div style={{ padding: '10px 12px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '30px', height: '30px', borderRadius: '50%',
                background: 'var(--accent-gradient)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '13px', fontWeight: 700, color: 'white', flexShrink: 0
              }}>
                {user.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-main)' }}>
                  {user.name}
                </div>
              </div>
              <button
                onClick={logout}
                title="Sign out"
                style={{
                  background: 'rgba(239,68,68,0.1)', border: 'none',
                  color: '#f87171', cursor: 'pointer', padding: '6px',
                  borderRadius: '8px', display: 'flex', alignItems: 'center',
                  transition: 'all 0.2s'
                }}
                className="logout-btn"
              >
                <LogOut size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .sidebar-nav-btn:hover {
          background: rgba(255, 255, 255, 0.05) !important;
          color: white !important;
        }
        .sidebar-icon-btn:hover {
          background: rgba(255,255,255,0.12) !important;
          color: white !important;
        }
        .library-item:hover {
          background: rgba(255, 255, 255, 0.06) !important;
        }
        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.2) !important;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
