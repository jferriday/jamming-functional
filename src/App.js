import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';

function App() {
  // variable to hold an array of search results returned by the spotify search API
  const [searchResults, setSearchResults] = useState([
    {title: 'title1', artist: 'artist1', album: 'album1', id: 1},
    {title: 'title2', artist: 'artist2', album: 'album2', id: 2},
    {title: 'title3', artist: 'artist3', album: 'album3', id: 3}
  ])

    // variable to hold array of tracks added to the playlist
  const [playlist, setPlaylist] = useState([
    {title: 'title3', artist: 'artist3', album: 'album3', id: 3},
    {title: 'title4', artist: 'artist4', album: 'album4', id: 4},
    {title: 'title5', artist: 'artist5', album: 'album5', id: 5}
  ])

  /* Code below adds individual tracks to a playlist and removes them from the search results. */
  // Add a track to the playlist
  const addTrack = (track) => {
    return setPlaylist((prevTracks) => [...prevTracks, track])
  }
  // remove a track from results list as it is added to playlist
  const removeFromResults = (trackId) => {
    // return previous results with tracks matching the ID of track to be removed filtered out
    return setSearchResults((results) => results.filter((track) => {
      return track.id !== trackId;
    }))
  }

  /* The following code performs the opposite function to that above,
  removing a track from the playlist and putting it back into the results */
  const addToResults = (track) => {
    return setSearchResults((results) => [...results, track]) // places the track at the end of the results list
  }
  // filters out tracks with matching ID from the playlist
  const removeFromPlaylist = (trackId) => {
    return setPlaylist((tracks) => {
      return tracks.filter((track) => track.id !== trackId);
    })
  }
  

  return (
    <div className="app">
      <header>
        <h1>Jamming</h1>
      </header>
      <div>
        <div className="search">
          <SearchBar />
        </div>
        {/* This will hold tbe search results and playlist */}
        <div className="track-area">
          <SearchResults searchResults={searchResults} addTrack={addTrack} removeFromResults={removeFromResults} />
          <Playlist playlistTracks={playlist} addToResults={addToResults} removeFromPlaylist={removeFromPlaylist} />
        </div>
        

      </div>
    </div>   
  );
}

export default App;
