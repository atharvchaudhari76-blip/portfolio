import React, { useState, useEffect } from 'react';
import { getTrending } from '../services/musicService';
import { useAudio } from '../context/AudioContext';
import SongCard from './SongCard';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [categories, setCategories] = useState([]);
  const { playTrack } = useAudio();
  const [greeting, setGreeting] = useState('Good day');

  useEffect(() => {
    const fetchMusic = async () => {
      const allSongs = await getTrending();
      setSongs(allSongs);
      
      setCategories([
        { id: '1', title: 'Top Hits', tracks: allSongs.slice(0, 6) },
        { id: '2', title: 'Recently Played', tracks: allSongs.slice(6, 12) },
        { id: '3', title: 'Focus', tracks: allSongs.slice(12, 18) },
        { id: '4', title: 'Chill Vibes', tracks: allSongs.slice(18, 24) }
      ]);
    };

    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good morning');
      else if (hour < 18) setGreeting('Good afternoon');
      else setGreeting('Good evening');
    };

    fetchMusic();
    updateGreeting();
  }, []);

  return (
    <div className="home-view animate-fade-in">
      <header className="view-header">
         <h1 className="view-title">{greeting}</h1>
      </header>

      <div className="home-categories">
        {categories.map(category => (
          <section key={category.id} className="home-section">
            <h2 className="section-title">{category.title}</h2>
            <div className="song-grid">
              {category.tracks.map(song => (
                <SongCard 
                  key={song.id} 
                  song={song} 
                  onClick={() => playTrack(song, category.tracks)} 
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Home;
