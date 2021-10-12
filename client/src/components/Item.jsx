import React from 'react';

function Item({artist}) {

    return (
    <div className="item-container">
      <h2>{artist.Name}</h2>
      <iframe src={artist.yUrl}></iframe>
      <div className="bio">{artist.wTeaser}</div>
      <button>Save</button>
    </div>
  )
}

export default Item;