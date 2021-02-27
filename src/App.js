import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import {Spotify} from './Spotify'
import Login from './components/login';

function App() {
  const [searchTerm, setSearchTerm] = useState();
  // variable to hold an array of search results returned by the spotify search API
  const [searchResults, setSearchResults] = useState([])
  // variable to hold playlist name, which is dynamically updates as it is typed into 'name' field
  const [playlistName, setPlaylistName] = useState("New Playlist");

    // variable to hold array of tracks added to the playlist
  const [playlist, setPlaylist] = useState([])
  // Track object structure: {title: 'title3', artist: 'artist3', album: 'album3', id: 3}

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

  const handleNameChange = (e) => {
    setPlaylistName(e.target.value);
  }

  const handleLogin = (e) => {
    Spotify.getToken()
  }

  const handleSearch = async () => {
    let tracks;
   await Spotify.search(searchTerm)
   .then((response) => tracks = response.tracks);
    console.log(tracks);

  setSearchResults((prev) => {
    return tracks.items.map((track) => {
      return {title: track.name , artist: track.artists[0].name, album: track.album.name, id: track.uri }
     })
   })
  }

  const handleSave = () => {
    const success = Spotify.savePlaylist(playlistName, playlist);
    if (success) {
      setPlaylist([]);
      alert('Playlist saved!');
    }
  }
  
 

  return (
    <div className="app">
      <header>
        <h1>Jamming</h1>
      </header>
      <div>
        <div className="search">
          <Login handleLogin={handleLogin} />
          <SearchBar setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
        </div>
        {/* This will hold tbe search results and playlist */}
        <div className="track-area">
          <SearchResults searchResults={searchResults} addTrack={addTrack} removeFromResults={removeFromResults} />
          <Playlist playlistTracks={playlist} 
          addToResults={addToResults} 
          removeFromPlaylist={removeFromPlaylist} 
          handleNameChange={handleNameChange} 
          handleSave={handleSave}/>
        </div>
        

      </div>
    </div>   
  );
}

export default App;
