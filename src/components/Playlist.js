import React from 'react';
import Tracklist from './Tracklist.js'
    
function Playlist(props) {
    const playlistTracks = props.playlistTracks;

    //save button need a handler to call save function from the Spotify module
    // Playlist passes removal functions (addtoResults and removeFromPlaylist) to Tracklist
    return(
        <div className="playlist">
            <div className="playlist-name">
                <input type='text' placeholder='New Playlist' />
            </div>
            <div>
                {/* IsInPlaylist tells tracks whether to use a + or - symbol for their add/remove button */}
                <Tracklist tracks={playlistTracks} isInPlaylist={true}
                 addToResults={props.addToResults} removeFromPlaylist={props.removeFromPlaylist}/>
            </div>
            <div>
                <button>SAVE TO SPOTIFY</button>
            </div>
        </div>
    )
}

export default Playlist;