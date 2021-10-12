import React from 'react';

function Search({searchTerm, handleSearchChange, handleSearchSubmit}) {
  return (
    <form>
      <input type="text" name="search" value={searchTerm} onChange={handleSearchChange}></input>
      <button id="main-button" onClick={handleSearchSubmit}>Search</button>
    </form>
  )
}

export default Search;