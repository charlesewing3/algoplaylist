import React from 'react';
import Item from './Item.jsx';

function RelatedItems({similarArtists, searchedArtist}) {
  console.log("SIMILAR:", searchedArtist)

    return (
      <div id="row3">
        <button className="arrow"> {'<'} </button>
        <div id="related-container">
          <div>Suggested Artists Like {searchedArtist.Name}</div>
          <div id="related-inner-container">
            {similarArtists.map(artist => <Item artist={artist} key={artist.Name}/>)}
          </div>
        </div>
        <button className="arrow"> {'>'} </button>
      </div>
    )

}

export default RelatedItems;