import React from 'react';
import Item from './Item.jsx';

function RelatedItems({similarArtists, searchedArtist}) {

    return (
      <div id="row3">
        {/* <button className="arrow"> {'<'} </button> */}
        <div id="related-container">

          <h1 className="heading1">Playlist based on <i>{searchedArtist.Name}</i></h1>
          {/* <i>Autoplay all</i> */}
          <div id="related-inner-container">
            {similarArtists.map((fourArtists, index) => {
              var output = [];
              for (var i = 0; i < fourArtists.length; i++) {
                output.push(<Item artist={fourArtists[i]} key={fourArtists[i].Name}/>)
              }
              return <div className="rowX" key={'row'+ index}>{output}</div>;
            })}
          </div>
        </div>
        {/* <button className="arrow"> {'>'} </button> */}
      </div>
    )

}

export default RelatedItems;