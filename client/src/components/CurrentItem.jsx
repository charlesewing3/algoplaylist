import React from 'react';

function CurrentItem({artist}) {
  console.log(artist)
    return (
      <div className="wrapper2">
        <div id="current-item-container">
          <h1 className="heading1">About {artist.Name}</h1>
          {artist.wTeaser !== "" ? <div id="teaser">{artist.wTeaser}</div> : null}
        </div>
        <div id="footer"></div>
      </div>
  )
}

export default CurrentItem;