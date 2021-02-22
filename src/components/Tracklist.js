import React from 'react';
import Track from './Track.js';

function Tracklist(props) {
const tracks = props.tracks

    return(
        <div className="tracklist">
            {tracks.map((track) => {
                return <Track isInPlaylist={props.isInPlaylist} title={track.title} artist={track.artist} album={track.album} id={track.id} playlist={tracks}/>})}

        </div>
    )
}

export default Tracklist