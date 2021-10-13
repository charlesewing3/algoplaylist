import React from 'react';

function CurrentItem({artist}) {
  console.log(artist)
    return (
      <div className="wrapper2">
        <div id="current-item-container">
          <h1 className="heading1">About {artist.Name}</h1>
          {artist.wTeaser !== "" ? <div id="teaser">{artist.wTeaser}</div> : null}
        </div>
        <div id="footer">
          {/* <img src="../../images/github2.png" alt="https://github.com/charlesewing3/"/> */}
            <a href="https://github.com/charlesewing3"><i className="fa fa-github-square fa-10X icon"></i></a>
            <a href="https://www.linkedin.com/in/charlesewing3/"><i className="fa fa-linkedin fa-10x icon"></i></a>
          <div>© Charles Ewing 2021</div>
        </div>
      </div>
  )
}

export default CurrentItem;