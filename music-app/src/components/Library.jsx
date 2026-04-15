import React from 'react';
import { Plus, Play, MoreHorizontal } from 'lucide-react';

const mockPlaylists = [
  { id: 1, title: 'My Playlist #1', tracks: 12, color: '#1db954' },
  { id: 2, title: 'Workout Beats', tracks: 28, color: '#ff4500' },
  { id: 3, title: 'Chill Vibes', tracks: 45, color: '#1e90ff' },
  { id: 4, title: 'Road Trip', tracks: 19, color: '#ffd700' },
];

const mockLikedTracks = [
  { id: 1, title: 'Liked Song 1', artist: 'Liked Artist', duration: '3:21' },
  { id: 2, title: 'Liked Song 2', artist: 'Liked Artist 2', duration: '4:05' },
];

const Library = () => {
  return (
    <div className="library">
      <header className="library-header">
        <h1>Your Library</h1>
        <div className="library-actions">
          <button className="btn-secondary">
            <Plus size={20} />
            Create
          </button>
        </div>
      </header>

      <section className="playlists-section">
        <h2>Playlists</h2>
        <div className="playlists-grid">
          {mockPlaylists.map((playlist) => (
            <div key={playlist.id} className="playlist-card library-playlist">
              <div className="playlist-color" style={{ backgroundColor: playlist.color }}></div>
              <div className="playlist-info">
                <h3>{playlist.title}</h3>
                <p>{playlist.tracks} tracks</p>
              </div>
              <Play size={24} className="playlist-play" />
            </div>
          ))}
        </div>
      </section>

      <section className="liked-songs">
        <h2>Liked Songs</h2>
        <div className="tracks-grid">
          {mockLikedTracks.map((track) => (
            <div key={track.id} className="track-item">
              <div className="track-play">
                <Play size={20} />
              </div>
              <div className="track-info">
                <p className="track-title">{track.title}</p>
                <p className="track-artist">{track.artist}</p>
              </div>
              <span className="track-duration">{track.duration}</span>
              <MoreHorizontal size={20} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Library;

