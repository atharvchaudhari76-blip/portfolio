import React, { useEffect, useState } from 'react';
import { getTrending } from '../services/musicService';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, Heart, MoreHorizontal, Shuffle } from 'lucide-react';
import SongCard from './SongCard';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playTrack, library, currentTrack, isPlaying, togglePlay, toggleShuffle, isShuffled } = useAudio();

  useEffect(() => {
    setLoading(true);
    getTrending().then(data => {
      setTrending(data);
      setLoading(false);
    });
  }, []);

  const heroSong = trending[0];
  const isHeroPlaying = currentTrack?.id === heroSong?.id && isPlaying;

  const handleHeroPlay = () => {
    if (!heroSong) return;
    if (currentTrack?.id === heroSong.id) {
      togglePlay();
    } else {
      playTrack(heroSong, trending);
    }
  };

  return (
    <div className="animate-fade-in">

      {/* Hero Banner */}
      {loading ? (
        <div style={{
          height: '280px', borderRadius: '12px', marginBottom: '32px',
          background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(34,211,238,0.1))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ textAlign: 'center', color: 'var(--text-dim)' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px', animation: 'float 3s ease-in-out infinite' }}>🎵</div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>Loading trending tracks…</div>
          </div>
        </div>
      ) : heroSong && (
        <section style={{
          position: 'relative',
          padding: '28px',
          background: `linear-gradient(135deg, rgba(168,85,247,0.35) 0%, rgba(34,211,238,0.15) 50%, var(--bg-base) 100%)`,
          borderRadius: '12px',
          margin: '-24px -24px 32px -24px',
          display: 'flex',
          gap: '24px',
          alignItems: 'flex-end',
          minHeight: '300px',
          overflow: 'hidden',
          border: '1px solid var(--border-subtle)'
        }}>
          {/* Blurred BG Art */}
          <div style={{
            position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0,
            borderRadius: '12px'
          }}>
            <img
              src={heroSong.thumbnail} alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12, filter: 'blur(40px)', transform: 'scale(1.1)' }}
            />
          </div>

          {/* Album Art */}
          <img
            src={heroSong.thumbnail}
            alt={heroSong.title}
            style={{
              width: '200px', height: '200px', borderRadius: '8px',
              boxShadow: '0 16px 48px rgba(0,0,0,0.7)',
              objectFit: 'cover', flexShrink: 0, position: 'relative', zIndex: 1
            }}
          />

          {/* Info */}
          <div style={{ flex: 1, paddingBottom: '4px', position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '11px', fontWeight: 700, marginBottom: '10px', color: 'rgba(255,255,255,0.7)', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Trending Now
            </div>
            <h1 style={{
              fontFamily: 'Outfit',
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 900,
              lineHeight: 1.05,
              color: 'white',
              letterSpacing: '-2px',
              marginBottom: '12px',
              textShadow: '0 4px 24px rgba(0,0,0,0.5)'
            }}>
              {heroSong.title}
            </h1>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
              {heroSong.artist} • {trending.length} songs
            </div>
          </div>
        </section>
      )}

      {/* Action Bar */}
      {!loading && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '36px', paddingLeft: '4px' }}>
          <button
            onClick={handleHeroPlay}
            style={{
              width: '52px', height: '52px', borderRadius: '50%',
              background: 'var(--accent-gradient)',
              border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0,
              boxShadow: '0 8px 24px rgba(168,85,247,0.5)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            }}
            title={isHeroPlaying ? 'Pause' : 'Play Trending'}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {isHeroPlaying
              ? <Pause size={22} fill="white" color="white" />
              : <Play size={22} fill="white" color="white" style={{ marginLeft: '2px' }} />
            }
          </button>

          <button
            onClick={() => { if (heroSong) { toggleShuffle(); playTrack(heroSong, trending); } }}
            style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: isShuffled ? 'rgba(168,85,247,0.15)' : 'transparent',
              border: `1px solid ${isShuffled ? 'rgba(168,85,247,0.4)' : 'rgba(255,255,255,0.12)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: isShuffled ? 'var(--accent-primary)' : 'var(--text-muted)',
              transition: 'all 0.2s'
            }}
            title="Shuffle play"
          >
            <Shuffle size={16} />
          </button>

          <button className="btn" style={{ padding: '8px' }} title="Like playlist">
            <Heart size={26} />
          </button>

          <button className="btn" style={{ padding: '8px' }} title="More options">
            <MoreHorizontal size={26} />
          </button>
        </div>
      )}

      {/* Mixed for you */}
      {!loading && trending.length > 1 && (
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontFamily: 'Outfit', fontSize: '22px', fontWeight: 700, color: 'white' }}>Mixed for you</h2>
            <button className="btn" style={{ fontSize: '13px', fontWeight: 700 }}>Show all</button>
          </div>
          <div className="song-grid">
            {trending.slice(1, 7).map(song => (
              <SongCard key={song.id} song={song} onClick={(s) => playTrack(s, trending)} />
            ))}
          </div>
        </section>
      )}

      {/* Jump back in */}
      {library.length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontFamily: 'Outfit', fontSize: '22px', fontWeight: 700, color: 'white' }}>Jump back in</h2>
            <button className="btn" style={{ fontSize: '13px', fontWeight: 700 }}>Show all</button>
          </div>
          <div className="song-grid">
            {library.slice(0, 6).map(song => (
              <SongCard key={song.id} song={song} onClick={(s) => playTrack(s, library)} />
            ))}
          </div>
        </section>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Home;
