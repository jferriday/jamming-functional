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
          <SearchResults searchResults={searchResults} />
          <Playlist playlistTracks={playlist} />
        </div>
        

      </div>
    </div>   
  );
}

export default App;
