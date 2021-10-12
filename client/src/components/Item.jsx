import React from 'react';

function Item({artist}) {

    return (
    <div className="item-container">
      <h2>{artist.Name}</h2>
      <div className="bio">{artist.wTeaser}</div>
      <iframe src={artist.yUrl}></iframe>
      <button>Save</button>
    </div>
  )
}

export default Item;