import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import {Spotify} from './Spotify'
import Login from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Card} from 'react-bootstrap/';



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
    <Container>
      <Row className="justify-content-md-center" bg="dark"> 
          <header>
            <h1>Jamming</h1>
          </header>
      </Row>

      <Row>
        <Col></Col>
        <Col>
        <div className="search">
          <Login handleLogin={handleLogin} />
        </div>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <SearchBar setSearchTerm={setSearchTerm} handleSearch={handleSearch} /> 
        </Col>  
        <Col></Col>
        <Col></Col>
      </Row>

      <Row>
        <Col>
          <SearchResults searchResults={searchResults} addTrack={addTrack} removeFromResults={removeFromResults} />
        </Col>
        <Col></Col>
        <Col>
            <Playlist playlistTracks={playlist} 
            addToResults={addToResults} 
            removeFromPlaylist={removeFromPlaylist} 
            handleNameChange={handleNameChange} 
            handleSave={handleSave}/>
        </Col>
      </Row>
    </Container>  
  );
}

export default App;
