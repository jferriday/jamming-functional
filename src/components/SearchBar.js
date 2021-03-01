import React from 'react';
import '../App.css';

function SearchBar (props) {
const handleChange = (e) => {
    props.setSearchTerm((prev) => e.target.value);
}

return(
    <div className='input-area'>
        <input className="input" placeholder="Enter a track name, artist or album" type="text" name="searchTerm" onChange={handleChange}></input>
        <button className="button" onClick={props.handleSearch}>SEARCH</button>

    </div>
)
}

export default SearchBar;