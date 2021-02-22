import React from 'react';
import Tracklist from './Tracklist.js'
    
function Playlist(props) {
    const playlistTracks = props.playlistTracks;

    //save button need a handler to call save function from the Spotify module
    return(
        <div className="playlist">
            <div>
                {/* IsInPlaylist tells tracks whether to use a + or - symbol for their add/remove button */}
                <Tracklist tracks={playlistTracks} isInPlaylist={true}/>
            </div>
            <div>
                <button>SAVE TO SPOTIFY</button>
            </div>
        </div>
    )
}

export default Playlist;