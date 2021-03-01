import React from 'react';
import Tracklist from './Tracklist.js'
import '../App.css';

function SearchResults(props) {
    const searchResults = props.searchResults;
    return(
        <div className="tracklist">
            <Tracklist tracks={searchResults} isInPlaylist={false} addTrack={props.addTrack} removeFromResults={props.removeFromResults}/>
        </div>
    )
}

export default SearchResults;