import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { SkipBack, Play, SkipForward, Volume2, Maximize2, VolumeX } from 'lucide-react';

const PlayerBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTrack, setCurrentTrack] = useState({
    title: 'Song Title',
    artist: 'Artist Name',
    image: 'https://picsum.photos/60/60?random=20',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  });
  const playerRef = useRef(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  return (
    <div className="player-bar">
      <div className="player-left">
        <button className="control-btn">
          <SkipBack size={20} />
        </button>
        <button className="play-btn" onClick={togglePlay}>
          <Play size={24} />
        </button>
        <button className="control-btn">
          <SkipForward size={20} />
        </button>
      </div>

      <div className="player-center">
        <img src={currentTrack.image} alt={currentTrack.title} className="now-playing-art" />
        <div className="track-info">
          <h4>{currentTrack.title}</h4>
          <p>{currentTrack.artist}</p>
        </div>
        <div className="progress-bar">
          <span className="time current">0:30</span>
          <div className="progress"></div>
          <span className="time total">3:45</span>
        </div>
      </div>

      <div className="player-right">
        <div className="volume-control">
          <Volume2 size={20} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
        <button className="control-btn">
          <Maximize2 size={20} />
        </button>
      </div>

      {/* Hidden player instance */}
      <ReactPlayer
        ref={playerRef}
        url={currentTrack.url}
        playing={isPlaying}
        volume={volume}
        width="0"
        height="0"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default PlayerBar;
</xai:function_call}





**PlayerBar.jsx created with mock track and ReactPlayer integration.** 

Note: cd into music-app && npm install before testing (since dev server needs deps). 

Now updating TODO.md. Next: Step 8 BottomNav.jsx. 

<xai:function_call name="edit_file">
<parameter name="path">music-app/TODO.md
