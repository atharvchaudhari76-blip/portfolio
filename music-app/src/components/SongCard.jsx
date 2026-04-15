import React from 'react';
import { Play, Heart } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const SongCard = ({ song, onClick, children }) => {
  const { library, addToLibrary, removeFromLibrary, currentTrack, isPlaying } = useAudio();
  const isLiked = library.some(t => t.id === song.id);
  const isActive = currentTrack?.id === song.id;

  const handleLike = (e) => {
    e.stopPropagation();
    isLiked ? removeFromLibrary(song.id) : addToLibrary(song);
  };

  return (
    <div
      className="song-card"
      onClick={() => onClick(song)}
      style={{
        padding: '14px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        position: 'relative',
        background: isActive ? 'rgba(168,85,247,0.1)' : 'rgba(255,255,255,0.03)',
        borderRadius: '10px',
        border: isActive
          ? '1px solid rgba(168,85,247,0.25)'
          : '1px solid rgba(255,255,255,0.04)',
        transition: 'all 0.2s ease'
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1', overflow: 'hidden', borderRadius: '6px', boxShadow: '0 6px 20px rgba(0,0,0,0.5)' }}>
        <img
          src={song.thumbnail}
          alt={song.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Play overlay */}
        <div
          className="card-play-overlay"
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            padding: '8px', opacity: 0, transition: 'opacity 0.2s ease'
          }}
        >
          <div style={{
            width: '36px', height: '36px',
            background: 'var(--accent-primary)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(168,85,247,0.5)',
            transform: 'translateY(6px)',
            transition: 'transform 0.2s ease',
          }} className="card-play-btn">
            <Play fill="white" size={16} color="white" style={{ marginLeft: '2px' }} />
          </div>
        </div>

        {/* Like button */}
        <button
          onClick={handleLike}
          className="card-like-btn"
          title={isLiked ? 'Unlike' : 'Like'}
          style={{
            position: 'absolute', top: '6px', right: '6px',
            background: 'rgba(0,0,0,0.6)',
            border: 'none', borderRadius: '50%',
            padding: '6px', color: isLiked ? '#ec4899' : 'white',
            cursor: 'pointer', opacity: 0, zIndex: 3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            transition: 'opacity 0.2s, transform 0.15s'
          }}
        >
          <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
        </button>

        {/* Now playing indicator */}
        {isActive && isPlaying && (
          <div style={{
            position: 'absolute', top: '6px', left: '6px',
            background: 'var(--accent-primary)',
            borderRadius: '4px', padding: '3px 6px',
            fontSize: '9px', fontWeight: 800, color: 'white',
            letterSpacing: '0.5px', textTransform: 'uppercase'
          }}>
            ▶ Playing
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ overflow: 'hidden' }}>
        <div style={{
          fontWeight: 700, fontSize: '14px',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          marginBottom: '3px',
          color: isActive ? 'var(--accent-primary)' : 'var(--text-main)'
        }}>
          {song.title}
        </div>
        <div style={{
          fontSize: '12px', color: 'var(--text-muted)',
          fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
        }}>
          {song.artist}
        </div>
      </div>

      {children}

      <style>{`
        .song-card:hover {
          background: rgba(255,255,255,0.07) !important;
          border-color: rgba(255,255,255,0.08) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .song-card:active {
          transform: translateY(0px) scale(0.99);
        }
        .song-card:hover .card-play-overlay {
          opacity: 1 !important;
        }
        .song-card:hover .card-play-btn {
          transform: translateY(0) !important;
        }
        .song-card:hover .card-like-btn {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default SongCard;
