import React from 'react';
import { useAudio } from '../context/AudioContext';
import { Trash2, Library as LibraryIcon, Music2, Play } from 'lucide-react';
import SongCard from './SongCard';

const Library = () => {
  const { library, playTrack, removeFromLibrary } = useAudio();

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontFamily: 'Outfit', fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '4px' }}>
            Your Library
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>
            {library.length > 0
              ? `${library.length} track${library.length !== 1 ? 's' : ''} saved`
              : 'No tracks yet'
            }
          </p>
        </div>
        {library.length > 0 && (
          <button
            onClick={() => library.length > 0 && playTrack(library[0], library)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'var(--accent-gradient)',
              border: 'none', color: 'white',
              padding: '10px 20px', borderRadius: '99px',
              fontWeight: 700, fontSize: '14px', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(168,85,247,0.4)',
              transition: 'transform 0.15s, box-shadow 0.15s',
              fontFamily: 'inherit'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <Play size={16} fill="white" />
            Play All
          </button>
        )}
      </div>

      {library.length === 0 ? (
        /* Empty State */
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          minHeight: '380px', color: 'var(--text-muted)',
          textAlign: 'center', padding: '48px',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '16px',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{
            width: '80px', height: '80px',
            background: 'rgba(168,85,247,0.1)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '24px',
            border: '1px solid rgba(168,85,247,0.2)'
          }}>
            <LibraryIcon size={36} color="var(--accent-primary)" />
          </div>
          <h3 style={{ color: 'white', fontSize: '22px', fontWeight: 700, marginBottom: '10px' }}>
            Your library is empty
          </h3>
          <p style={{ maxWidth: '300px', lineHeight: 1.7, fontSize: '14px' }}>
            Search for songs and tap the ❤️ to save them here for quick access.
          </p>
        </div>
      ) : (
        <div className="song-grid">
          {library.map((song) => (
            <SongCard key={song.id} song={song} onClick={(s) => playTrack(s, library)}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromLibrary(song.id);
                }}
                style={{
                  marginTop: '6px', width: '100%',
                  background: 'rgba(239,68,68,0.07)',
                  border: '1px solid rgba(239,68,68,0.15)',
                  color: '#f87171',
                  padding: '7px', borderRadius: '6px',
                  fontSize: '12px', fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  transition: 'all 0.2s', fontFamily: 'inherit'
                }}
                className="remove-btn"
                title="Remove from library"
              >
                <Trash2 size={13} />
                Remove
              </button>
            </SongCard>
          ))}
        </div>
      )}

      <style>{`
        .remove-btn:hover {
          background: rgba(239,68,68,0.18) !important;
          border-color: rgba(239,68,68,0.35) !important;
        }
      `}</style>
    </div>
  );
};

export default Library;
