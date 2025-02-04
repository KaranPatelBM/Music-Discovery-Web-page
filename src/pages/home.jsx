import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/home.css';

const HomePage = () => {
  const [musicData, setMusicData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 

  const apiKey = process.env.REACT_APP_LAST_FM_API_KEY;; // Replace with your actual API key

  // Fetch trending music data on component mount
  useEffect(() => {
    console.log('Fetching music data...');
    const fetchMusicData = async () => {
      try {
        const response = await axios.get('https://ws.audioscrobbler.com/2.0/', {
          params: {
            method: 'chart.gettoptracks',
            api_key: apiKey,
            format: 'json',
          },
        });

        if (response.data && response.data.tracks && response.data.tracks.track) {
          setMusicData(response.data.tracks.track);
        } else {
          console.error('No tracks found in the response');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching music data:', error);
        setLoading(false);
      }
    };

    fetchMusicData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Function to handle play/pause of the audio
  const handlePlayPause = (track) => {
    if (currentTrack === track && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  // Function to render the audio player
  const renderAudioPlayer = () => {
    if (currentTrack) {
      const previewUrl = currentTrack?.preview;
      if (previewUrl) {
        return (
          <audio controls autoPlay>
            <source src={previewUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        );
      } else {
        return <p>No preview available for this track.</p>;
      }
    }
    return null;
  };

  // Filter music data based on search term
  const filteredMusicData = musicData.filter(track =>
    track.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading music data...</p>;
  }

  if (!musicData || musicData.length === 0) {
    return <p>No music data available at the moment.</p>;
  }

  return (
    <div className="main-content">
      <div className="Intro-tile" data-test-id="Intro-tile">
      <h2>Welcome to Karna Music Discovery</h2>
      <p>Explore new songs, albums, and artists. Discover your next favorite track!</p>
      </div>

      {/* Search Box */}
      <div className="search-container">
        <input
          type="text"
          className="search-box"
          placeholder="Search for music..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          data-test-id="search-box"
        />
      </div>

      <h3>Trending Music</h3>
      <div className="music-list">
        {filteredMusicData.map((track, index) => (
          <div
            key={index}
            className="music-item"
            data-test-id={`music-item-${index}`}
            onClick={() => handlePlayPause(track)}
          >
            <img src={track.image[2]['#text']} alt={track.name} className="music-image" />
            <p className="track-name">{track.name}</p>
            <p className="artist-name">{track.artist.name}</p>
            {!track.preview && <p className="no-preview">No preview available</p>}
          </div>
        ))}
      </div>

      {renderAudioPlayer()}
    </div>
  );
};

export default HomePage;
