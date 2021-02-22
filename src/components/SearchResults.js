import React from 'react';
import Tracklist from './Tracklist.js'

function SearchResults(props) {
    const searchResults = props.searchResults;
    console.log('Props in  search results', props);
    return(
        <div className="search-results">
            <Tracklist tracks={searchResults} isInPlaylist={false}/>
        </div>
    )
}

export default SearchResults;