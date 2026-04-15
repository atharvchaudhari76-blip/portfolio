import React from 'react';
import { Play, MoreHorizontal } from 'lucide-react';

const mockPlaylists = [
  { id: 1, title: 'Today\'s Top Hits', artist: 'Various Artists', image: 'https://picsum.photos/300/300?random=1' },
  { id: 2, title: 'RapCaviar', artist: 'Rap', image: 'https://picsum.photos/300/300?random=2' },
  { id: 3, title: 'Rock This', artist: 'Rock', image: 'https://picsum.photos/300/300?random=3' },
  { id: 4, title: 'Chill Hits', artist: 'Chill', image: 'https://picsum.photos/300/300?random=4' },
];

const mockTracks = [
  { id: 1, title: 'Song Title 1', artist: 'Artist 1', duration: '3:45' },
  { id: 2, title: 'Song Title 2', artist: 'Artist 2', duration: '4:12' },
];

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h2>Good evening</h2>
        <div className="hero-grid">
          {mockPlaylists.map((playlist) => (
            <div key={playlist.id} className="playlist-card">
              <img src={playlist.image} alt={playlist.title} />
              <div className="playlist-info">
                <h3>{playlist.title}</h3>
                <p>{playlist.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="recently-played">
        <h3>Recently played</h3>
        <div className="tracks-grid">
          {mockTracks.map((track) => (
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

export default Home;

