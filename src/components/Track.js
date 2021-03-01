import React from 'react';
import './Track.css';
function Track(props) {
    
    const trackButton = () => {
        if (props.isInPlaylist === true){
            return <button className="track-button" onClick={handleRemove}>-</button>
        }else{
            return <button className="track-button" onClick={handleAdd}>+</button>
        }
    }

    // functions used to add or remove a track from the playlist
   const addTrack = props.addTrack; 
   const removeFromResults = props.removeFromResults;
   const addToResults= props.addToResults;
   const removeFromPlaylist = props.removeFromPlaylist;

   const handleAdd = () => { // adds track to playlist and removes it from results
    addTrack({title: props.title, artist: props.artist, album: props.album, id: props.id});
    removeFromResults(props.id);
   }
    //removes a track from the playlist and adds it back to results
   const handleRemove = () => { 
       addToResults({title: props.title, artist: props.artist, album: props.album, id: props.id});
       removeFromPlaylist(props.id);
    }


    return(
        <div className="track">
            <div className="details">
                <h3 className="title">{props.title}</h3>
                <p className="track-details">{props.album} | {props.artist}</p>
            </div>
            <div className="add-button">
                {trackButton()}
            </div>
        </div>
    )
}

export default Track;