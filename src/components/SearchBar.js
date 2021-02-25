import React from 'react';

function SearchBar (props) {
const handleChange = (e) => {
    props.setSearchTerm((prev) => e.target.value);
}

return(
    <div className="search">
        <h2>Search for tracks</h2>
        <input placeholder="Enter a track name, artist or album" type="text" name="searchTerm" onChange={handleChange}></input>
        <button className="interface-button" onClick={props.handleSearch}>Search</button>

    </div>
)
}

export default SearchBar;