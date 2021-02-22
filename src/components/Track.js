import React from 'react';

function Track(props) {
    
    const trackButton = () => {
        if (props.isInPlaylist === true){
            return <button className="track-button">-</button>
        }else{
            return <button className="track-button">+</button>
        }
    }

    return(
        <div class="track">
            <h3 className="title">{props.title}</h3>
            <p className="track-details">{props.album} | {props.artist}</p>
            {trackButton()}
        </div>
    )
}

export default Track;