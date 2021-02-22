import React from 'react';

function SearchBar () {

return(
    <div className="search">
        <h2>Search for tracks</h2>
        <input placeholder="Enter a track name, artist or album" type="text" name="searchTerm"></input>
        <button>Search</button>

    </div>
)
}

export default SearchBar;