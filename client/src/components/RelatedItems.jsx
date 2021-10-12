import React from 'react';
import Item from './Item.jsx';

function RelatedItems({similarArtists, searchedArtist}) {
  console.log("SIMILAR:", searchedArtist)

    return (
      <div>
        <div id="related-container">
          <div>Suggested Artists Like {searchedArtist.Name}</div>
          <div id="related-inner-container">
            {similarArtists.map(artist => <Item artist={artist} key={artist.Name}/>)}
          </div>
        </div>
      </div>
    )

}

export default RelatedItems;