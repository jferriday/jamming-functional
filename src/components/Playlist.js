import React from 'react';
import Tracklist from './Tracklist.js'
import '../App.css';
    
function Playlist(props) {
    const playlistTracks = props.playlistTracks;

    //save button need a handler to call save function from the Spotify module
    // Playlist passes removal functions (addtoResults and removeFromPlaylist) to Tracklist
    return(
        <div>
            <div className="input-area">
                <input className="input" type='text' placeholder='New Playlist' onChange={props.handleNameChange} />
                <button className="button" onClick={props.handleSave}>SAVE</button>
            </div>
            <div className="tracklist">
                {/* IsInPlaylist tells tracks whether to use a + or - symbol for their add/remove button */}
                <Tracklist tracks={playlistTracks} isInPlaylist={true}
                 addToResults={props.addToResults} removeFromPlaylist={props.removeFromPlaylist}/>
            </div>
            
                
            
        </div>
    )
}

export default Playlist;