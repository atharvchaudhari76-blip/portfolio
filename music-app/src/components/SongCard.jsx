import React, { useState } from 'react';
import { Play, Plus, Heart, Pause, Music } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const SongCard = ({ song, onClick }) => {
  const { 
    currentTrack, 
    isPlaying, 
    library, 
    addToLibrary, 
    removeFromLibrary, 
    playlists, 
    addToPlaylist,
    createPlaylist 
  } = useAudio();
  
  const [showPlaylists, setShowPlaylists] = useState(false);
  const isActive = currentTrack?.id === song.id;
  const isCurrentlyPlaying = isActive && isPlaying;
  const isLiked = library.some(t => t.id === song.id);

  const handleLike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      removeFromLibrary(song.id);
    } else {
      addToLibrary(song);
    }
  };

  const handleAddToPlaylist = (e, playlistId) => {
    e.stopPropagation();
    addToPlaylist(playlistId, song);
    setShowPlaylists(false);
  };

  const handleNewPlaylist = (e) => {
    e.stopPropagation();
    const name = window.prompt("Playlist name:");
    if (name) {
      const newPlaylist = createPlaylist(name);
      addToPlaylist(newPlaylist.id, song);
    }
    setShowPlaylists(false);
  };

  return (
    <div
      className={`song-card ${isActive ? 'active' : ''} animate-fade-in`}
      onClick={() => onClick(song)}
    >
      <div className="card-image-container">
        {song.thumbnail ? (
          <img
            src={song.thumbnail}
            alt={song.title}
            className="card-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop';
            }}
          />
        ) : (
          <div className="placeholder-art">
             <Music size={48} strokeWidth={1} />
          </div>
        )}
        
        <div className="card-overlay-actions">
          <button 
            className={`card-action-btn heart ${isLiked ? 'active' : ''}`}
            onClick={handleLike}
            title={isLiked ? "Remove from Library" : "Add to Library"}
          >
            <Heart size={18} fill={isLiked ? "var(--accent-primary)" : "none"} stroke={isLiked ? "var(--accent-primary)" : "currentColor"} />
          </button>
          
          <button 
            className="card-action-btn plus"
            onClick={(e) => {
              e.stopPropagation();
              setShowPlaylists(!showPlaylists);
            }}
            title="Add to Playlist"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className={`card-play-button ${isCurrentlyPlaying ? 'playing' : ''}`}>
          {isCurrentlyPlaying ? (
            <div className="playing-indicator">
              <span></span><span></span><span></span>
            </div>
          ) : (
            <Play fill="black" size={24} color="black" />
          )}
        </div>

        {showPlaylists && (
          <div className="playlist-dropdown animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="dropdown-header">Add to playlist</div>
            <div className="dropdown-content">
              <button className="dropdown-item create" onClick={handleNewPlaylist}>
                <Plus size={14} /> New Playlist
              </button>
              {playlists.map(p => (
                <button key={p.id} className="dropdown-item" onClick={(e) => handleAddToPlaylist(e, p.id)}>
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="card-info">
        <h4 className="card-title" title={song.title}>{song.title}</h4>
        <p className="card-artist" title={song.artist}>{song.artist}</p>
      </div>
    </div>
  );
};

export default SongCard;
