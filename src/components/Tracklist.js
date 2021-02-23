import React from 'react';
import Track from './Track.js';

function Tracklist(props) {
const tracks = props.tracks

// tracks are passed removal functions from a tracklist in the playlist OR add functions from a tracklist in the search results

    return(
        <div className="tracklist">
            {tracks.map((track) => {
                return <Track isInPlaylist={props.isInPlaylist}
                 title={track.title} 
                 artist={track.artist}
                  album={track.album}
                  id={track.id}
                  playlist={tracks}
                  addTrack={props.addTrack}
                  removeFromResults={props.removeFromResults}
                  addToResults={props.addToResults}
                  removeFromPlaylist={props.removeFromPlaylist}/>})}

        </div>
    )
}

export default Tracklist