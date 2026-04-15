import React, { useState, useRef } from 'react';
import { Search as SearchIcon, Loader2, Plus, Check, X } from 'lucide-react';
import { searchMusic } from '../services/musicService';
import { useAudio } from '../context/AudioContext';
import SongCard from './SongCard';

const GENRES = [
  { name: 'Pop', color: '#e11d87', emoji: '🎤' },
  { name: 'Rock', color: '#dc2626', emoji: '🎸' },
  { name: 'Hip-Hop', color: '#d97706', emoji: '🎧' },
  { name: 'Electronic', color: '#7c3aed', emoji: '⚡' },
  { name: 'Jazz', color: '#0891b2', emoji: '🎷' },
  { name: 'Classical', color: '#059669', emoji: '🎻' },
  { name: 'R&B', color: '#db2777', emoji: '🎼' },
  { name: 'Indie', color: '#9333ea', emoji: '🌿' },
  { name: 'Metal', color: '#374151', emoji: '🤘' },
  { name: 'Country', color: '#b45309', emoji: '🎻' },
  { name: 'Bollywood', color: '#c2410c', emoji: '🎬' },
  { name: 'Lo-fi', color: '#2563eb', emoji: '☕' },
];

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { playTrack, addToLibrary, library } = useAudio();
  const inputRef = useRef(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchMusic(q);
      setResults(data);
      if (data.length === 0) setError('No results found. Try a different search term.');
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenreClick = async (genre) => {
    setQuery(genre.name);
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchMusic(genre.name);
      setResults(data);
    } catch {
      setError('Search failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setError(null);
    inputRef.current?.focus();
  };

  return (
    <div className="animate-fade-in">
      {/* Search Bar */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'Outfit', fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '20px' }}>
          Search
        </h1>
        <form onSubmit={handleSearch} style={{ position: 'relative', maxWidth: '480px' }}>
          <SearchIcon
            size={18}
            style={{
              position: 'absolute', left: '16px', top: '50%',
              transform: 'translateY(-50%)', color: 'var(--text-muted)', zIndex: 1,
              pointerEvents: 'none'
            }}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="What do you want to listen to?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid var(--border-glass)',
              padding: '13px 44px 13px 46px',
              borderRadius: '99px',
              color: 'white',
              fontSize: '14px',
              fontWeight: 500,
              outline: 'none',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.1)';
              e.target.style.borderColor = 'rgba(168,85,247,0.5)';
              e.target.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.1)';
            }}
            onBlur={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.07)';
              e.target.style.borderColor = 'var(--border-glass)';
              e.target.style.boxShadow = 'none';
            }}
          />
          {isLoading && (
            <div style={{ position: 'absolute', right: '48px', top: '50%', transform: 'translateY(-50%)' }}>
              <Loader2 className="animate-spin" size={16} color="var(--accent-primary)" />
            </div>
          )}
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              style={{
                position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)', border: 'none', color: 'var(--text-muted)',
                cursor: 'pointer', padding: '4px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s'
              }}
            >
              <X size={12} />
            </button>
          )}
        </form>
      </div>

      {/* Error State */}
      {error && (
        <div style={{
          marginBottom: '24px', color: '#f87171',
          background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.15)',
          padding: '14px 16px', borderRadius: '10px',
          fontSize: '14px', fontWeight: 500
        }}>
          {error}
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 && !error ? (
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontFamily: 'Outfit', fontSize: '22px', fontWeight: 700, color: 'white' }}>
              Top results
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 500 }}>
              {results.length} tracks
            </span>
          </div>
          <div className="song-grid">
            {results.map((song) => {
              const isLiked = library.find(t => t.id === song.id);
              return (
                <SongCard key={song.id} song={song} onClick={(s) => playTrack(s, results)}>
                  <button
                    className="btn"
                    onClick={(e) => { e.stopPropagation(); addToLibrary(song); }}
                    style={{
                      marginTop: '6px', width: '100%',
                      background: isLiked ? 'rgba(168,85,247,0.15)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${isLiked ? 'rgba(168,85,247,0.3)' : 'transparent'}`,
                      padding: '7px', borderRadius: '6px',
                      fontSize: '12px', fontWeight: 700,
                      color: isLiked ? 'var(--accent-primary)' : 'var(--text-muted)',
                      transition: 'all 0.2s', justifyContent: 'center', gap: '6px'
                    }}
                    title={isLiked ? 'Saved to library' : 'Add to library'}
                  >
                    {isLiked ? <Check size={13} /> : <Plus size={13} />}
                    {isLiked ? 'Saved' : 'Save'}
                  </button>
                </SongCard>
              );
            })}
          </div>
        </div>
      ) : !isLoading && results.length === 0 && (
        /* Browse by Genre */
        <section>
          <h2 style={{ fontFamily: 'Outfit', fontSize: '22px', fontWeight: 700, marginBottom: '20px', color: 'white' }}>
            Browse by genre
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
            {GENRES.map((genre) => (
              <button
                key={genre.name}
                onClick={() => handleGenreClick(genre)}
                style={{
                  aspectRatio: '1.6',
                  borderRadius: '10px',
                  padding: '16px',
                  fontSize: '17px',
                  fontWeight: 800,
                  fontFamily: 'Outfit',
                  background: `linear-gradient(135deg, ${genre.color}cc, ${genre.color}66)`,
                  border: 'none',
                  cursor: 'pointer',
                  color: 'white',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  boxShadow: `0 4px 16px ${genre.color}33`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
                className="genre-card"
              >
                <span>{genre.name}</span>
                <span style={{ fontSize: '28px', position: 'absolute', bottom: '10px', right: '14px', opacity: 0.7 }}>
                  {genre.emoji}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      <style>{`
        .genre-card:hover {
          transform: scale(1.03) !important;
          box-shadow: 0 8px 28px rgba(0,0,0,0.4) !important;
        }
        .genre-card:active {
          transform: scale(0.98) !important;
        }
      `}</style>
    </div>
  );
};

export default Search;
