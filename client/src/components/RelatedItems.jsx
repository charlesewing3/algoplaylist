import React from 'react';
import Item from './Item.jsx';

function RelatedItems({similarArtists, searchedArtist}) {

    return (
      <div id="row3">
        <button className="arrow"> {'<'} </button>
        <div id="related-container">
          {/* <div id="suggested-like-div"> <span id="suggested-like">Suggested Artists Like {searchedArtist.Name}:</span></div> */}
          <h1 className="heading1">Suggested Artists Like {searchedArtist.Name}:</h1>
          {/* <i>Autoplay all</i> */}
          <div id="related-inner-container">
            {similarArtists.map(artist => <Item artist={artist} key={artist.Name}/>)}
          </div>
        </div>
        <button className="arrow"> {'>'} </button>
      </div>
    )

}

export default RelatedItems;