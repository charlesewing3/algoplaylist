import React from 'react';
import Search from './Search.jsx';
import CurrentItem from './CurrentItem.jsx';
import RelatedItems from './RelatedItems.jsx';
import SavedItems from './SavedItems.jsx';
import AlgoExplanations from './AlgoExplanations.jsx';
import sampleData from '../../../sampleData.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      similarArtists: {},
      originalOrder: [],
      displayed: [],
      searchedArtist: {},
      playlist: []
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchChange(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    // request 50 items
    axios.get('/similar', {
      params: {
        q: this.state.searchTerm,
        type: 'music',
        verbose: 1,
        limit: 50
      }
    })
      .then(success => {
        var results = success.data.Similar.Results;
        var resultsWithBiosAndVids = [[], [], []];

        // create 3x3 nested array structure of first 9 items with bios and videos
        var j = 0;
        var k = 1;
        for (var i = 0; i < results.length; i++) {
          if (results[i].wTeaser !== '' && results[i].yUrl) {
            // auto play the first video
            if (resultsWithBiosAndVids[0].length === 0) {
              results[i].yUrl = results[i].yUrl + '?&autoplay=1';
            }
            // create the blue ordering numbers
            results[i].Number = k;
            k++;
            // add the video to the data structure
            resultsWithBiosAndVids[j].push(results[i]);
            if(resultsWithBiosAndVids[j].length === 3) {
              j++;
            }
          }
          // once rows 0, 1, and 2 have been populated, break
          if (j === 3) {
            break;
          }
        }

        this.setState({
          similarArtists: success.data,
          originalOrder: resultsWithBiosAndVids,
          displayed: resultsWithBiosAndVids,
          searchedArtist: success.data.Similar.Info[0]
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleSuggestedScroll() {

  }

  render() {
    return (
      <div id="app-container">
        <div id="header">
          <div id="title-subtitle">
            <h1 id="title">Algorithmic Playlist</h1>
            <h3 id="subtitle">Discover new artists. <br></br> Shuffle a playlist using your favorite sorting algorithms.</h3>
          </div>
          {/* <h1 id="title">Sketchy Pandora</h1>
          <h2 id="subtitle">Search for your favorite artists and create new playlists. You never know what you might find!</h2> */}
          <Search
            searchTerm={this.state.searchTerm}
            handleSearchChange={this.handleSearchChange}
            handleSearchSubmit={this.handleSearchSubmit}
          />
          <div>
            <i id="instructions">Search for an artist to get started...</i>
          </div>
        </div>

            {this.state.displayed.length > 0 ?
              <div id="big-container">
              <AlgoExplanations />
              <RelatedItems
                similarArtists={this.state.displayed}
                searchedArtist={this.state.searchedArtist}
                />
              <CurrentItem artist={this.state.searchedArtist}/>
              </div>
              : null}

            <SavedItems playlist={this.state.playlist}/>
      </div>
    )
  }
}

export default App;