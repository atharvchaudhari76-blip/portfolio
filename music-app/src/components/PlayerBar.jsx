import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const PlayerBar = () => {
  const { currentTrack, isPlaying, togglePlay, volume, setVolume, library, addToLibrary, removeFromLibrary, setIsPlaying } = useAudio();
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const isLiked = currentTrack && library.find(t => t.id === currentTrack.id);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error("Audio failed to play:", err);
          setIsPlaying(false);
          alert("Browser blocked auto-play or stream is temporarily unavailable.");
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack?.streamUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setPlayed(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  if (!currentTrack) return null;

  return (
    <div className="player-bar">
      {currentTrack.streamUrl && (
        <audio
          ref={audioRef}
          src={currentTrack.streamUrl}
          onTimeUpdate={(e) => setPlayed(e.target.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
          onEnded={() => setIsPlaying(false)}
          onError={(e) => {
             console.error("Native Audio Error", e);
             setIsPlaying(false);
          }}
          style={{ display: 'none' }}
        />
      )}

      <div className="player-section-info">
        <img 
          src={currentTrack.thumbnail} 
          alt={currentTrack.title} 
          style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
        />
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {currentTrack.title}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{currentTrack.artist}</div>
        </div>
        <button 
          className="btn hide-mobile" 
          onClick={() => isLiked ? removeFromLibrary(currentTrack.id) : addToLibrary(currentTrack)}
          style={{ color: isLiked ? 'var(--accent-primary)' : 'var(--text-muted)' }}
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="player-section-controls">
        <div className="playback-controls">
          <button className="btn" style={{ padding: '8px' }}><SkipBack size={20} /></button>
          <button 
            className="btn play-btn" 
            onClick={() => togglePlay()}
            style={{ background: 'white', color: 'black', padding: '10px', borderRadius: '50%' }}
          >
            {isPlaying ? (
              <Pause size={24} fill="black" />
            ) : (
              <Play size={24} fill="black" style={{ marginLeft: '2px' }} />
            )}
          </button>
          <button className="btn" style={{ padding: '8px' }}><SkipForward size={20} /></button>
        </div>
        
        <div className="progress-container hide-mobile">
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', width: '35px' }}>{formatTime(played)}</span>
          <input 
            type="range" 
            min={0} 
            max={duration || currentTrack.duration} 
            step="any"
            value={played}
            onChange={handleSeek}
            style={{ 
              flex: 1, 
              accentColor: 'var(--accent-primary)',
              height: '4px',
              borderRadius: '2px',
              cursor: 'pointer'
            }}
          />
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', width: '35px' }}>{formatTime(duration || currentTrack.duration)}</span>
        </div>
      </div>

      <div className="player-section-actions hide-mobile">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Volume2 size={18} color="var(--text-muted)" />
          <input 
            type="range" 
            min={0} 
            max={1} 
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            style={{ width: '80px', accentColor: 'var(--text-main)', height: '4px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;

