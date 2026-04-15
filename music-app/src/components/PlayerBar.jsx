import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Heart, Repeat, Shuffle, ChevronUp } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const PlayerBar = () => {
  const {
    currentTrack, isPlaying, togglePlay, volume, setVolume,
    library, addToLibrary, removeFromLibrary, setIsPlaying,
    playNext, playPrevious, toggleShuffle, isShuffled, toggleRepeat, repeatMode
  } = useAudio();

  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.7);
  const audioRef = useRef(null);

  const isLiked = currentTrack && library.find(t => t.id === currentTrack.id);
  const progress = duration > 0 ? (played / duration) * 100 : 0;

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error('Audio failed to play:', err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack?.streamUrl, setIsPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setPlayed(time);
    if (audioRef.current) audioRef.current.currentTime = time;
  };

  const handleVolumeToggle = () => {
    if (isMuted) {
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const repeatColor = repeatMode !== 'off' ? 'var(--accent-primary)' : 'var(--text-dim)';
  const shuffleColor = isShuffled ? 'var(--accent-primary)' : 'var(--text-dim)';

  if (!currentTrack) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--text-dim)', fontSize: '13px', fontWeight: 500,
        gap: '8px'
      }}>
        <span style={{ fontSize: '18px' }}>🎵</span>
        Select a track to start listening
      </div>
    );
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center',
      padding: '0 20px',
      justifyContent: 'space-between',
      position: 'relative',
      gap: '12px'
    }}>
      {currentTrack.streamUrl && (
        <audio
          ref={audioRef}
          src={currentTrack.streamUrl}
          onTimeUpdate={(e) => { if (!isDragging) setPlayed(e.target.currentTime); }}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
          onEnded={playNext}
          style={{ display: 'none' }}
        />
      )}

      {/* LEFT: Track Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '28%', minWidth: '160px' }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <img
            src={currentTrack.thumbnail}
            alt={currentTrack.title}
            style={{
              width: '52px', height: '52px',
              borderRadius: '8px', objectFit: 'cover',
              boxShadow: '0 4px 16px rgba(0,0,0,0.5)'
            }}
          />
          {isPlaying && (
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '8px',
              background: 'rgba(168,85,247,0.15)',
              animation: 'pulse 2s ease-in-out infinite'
            }} />
          )}
        </div>
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <div style={{
            fontWeight: 600, fontSize: '13px',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            color: 'var(--text-main)', marginBottom: '2px'
          }}>
            {currentTrack.title}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {currentTrack.artist}
          </div>
        </div>
        <button
          className="btn"
          onClick={() => isLiked ? removeFromLibrary(currentTrack.id) : addToLibrary(currentTrack)}
          style={{ color: isLiked ? '#ec4899' : 'var(--text-dim)', flexShrink: 0, padding: '6px' }}
          title={isLiked ? 'Remove from library' : 'Add to library'}
        >
          <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* CENTER: Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1, maxWidth: '580px' }}>
        {/* Buttons row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Shuffle */}
          <button
            className="btn hide-mobile"
            onClick={toggleShuffle}
            title="Shuffle"
            style={{ color: shuffleColor, position: 'relative', padding: '6px' }}
          >
            <Shuffle size={15} />
            {isShuffled && (
              <span style={{
                position: 'absolute', bottom: '2px', left: '50%',
                transform: 'translateX(-50%)', width: '3px', height: '3px',
                borderRadius: '50%', background: 'var(--accent-primary)'
              }} />
            )}
          </button>

          {/* Previous */}
          <button
            className="btn"
            onClick={playPrevious}
            title="Previous"
            style={{ color: 'var(--text-muted)', padding: '6px' }}
          >
            <SkipBack size={20} fill="currentColor" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            title={isPlaying ? 'Pause' : 'Play'}
            style={{
              width: '36px', height: '36px', padding: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '50%',
              background: 'white',
              color: 'black',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              transition: 'transform 0.1s ease, box-shadow 0.1s ease',
              flexShrink: 0
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.94)'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
          >
            {isPlaying
              ? <Pause size={18} fill="currentColor" />
              : <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />
            }
          </button>

          {/* Next */}
          <button
            className="btn"
            onClick={playNext}
            title="Next"
            style={{ color: 'var(--text-muted)', padding: '6px' }}
          >
            <SkipForward size={20} fill="currentColor" />
          </button>

          {/* Repeat */}
          <button
            className="btn hide-mobile"
            onClick={toggleRepeat}
            title={`Repeat: ${repeatMode}`}
            style={{ color: repeatColor, position: 'relative', padding: '6px' }}
          >
            <div style={{ position: 'relative', display: 'flex' }}>
              <Repeat size={15} />
              {repeatMode === 'one' && (
                <span style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '7px', fontWeight: 800, color: 'var(--accent-primary)'
                }}>1</span>
              )}
            </div>
            {repeatMode !== 'off' && (
              <span style={{
                position: 'absolute', bottom: '2px', left: '50%',
                transform: 'translateX(-50%)', width: '3px', height: '3px',
                borderRadius: '50%', background: 'var(--accent-primary)'
              }} />
            )}
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '10px', color: 'var(--text-dim)', minWidth: '30px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
            {formatTime(played)}
          </span>
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', height: '12px' }}>
            <input
              type="range"
              min={0}
              max={duration || currentTrack.duration || 0}
              step="any"
              value={played}
              onChange={handleSeek}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              style={{
                width: '100%',
                '--progress': `${progress}%`,
                accentColor: 'var(--accent-primary)'
              }}
            />
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-dim)', minWidth: '30px', fontVariantNumeric: 'tabular-nums' }}>
            {formatTime(duration || currentTrack.duration)}
          </span>
        </div>
      </div>

      {/* RIGHT: Volume */}
      <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '28%', justifyContent: 'flex-end' }}>
        <button
          className="btn"
          onClick={handleVolumeToggle}
          title={isMuted ? 'Unmute' : 'Mute'}
          style={{ padding: '6px', color: 'var(--text-muted)' }}
        >
          {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <input
          type="range"
          min={0} max={1} step="0.01"
          value={isMuted ? 0 : volume}
          onChange={(e) => { setIsMuted(false); setVolume(parseFloat(e.target.value)); }}
          style={{ width: '88px', '--progress': `${(isMuted ? 0 : volume) * 100}%`, accentColor: 'white' }}
          title="Volume"
        />
      </div>
    </div>
  );
};

export default PlayerBar;
