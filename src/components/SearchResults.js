import React from 'react';
import Tracklist from './Tracklist.js'

function SearchResults(props) {
    const searchResults = props.searchResults;
    return(
        <div className="search-results">
            <Tracklist tracks={searchResults} isInPlaylist={false} addTrack={props.addTrack} removeFromResults={props.removeFromResults}/>
        </div>
    )
}

export default SearchResults;