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
    this.flatten = this.flatten.bind(this);
    this.unFlatten = this.unFlatten.bind(this);
    this.merge = this.merge.bind(this);
    this.mergeSortReverse = this.mergeSortReverse.bind(this);
    this.handleMergeSortReverse = this.handleMergeSortReverse.bind(this);
    this.changeAutoPlay = this.changeAutoPlay.bind(this);
  }

  // updates state when you type in search bar
  handleSearchChange(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  // calls API when you submit a new search
  handleSearchSubmit(e) {
    // prevent page refresh
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

  //----------------------------------
  // Sorting Helper Functions
  //----------------------------------
  flatten(arr) {
    var flatArr = [];
    var innerFunction = function(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (!Array.isArray(arr[i])) {
          flatArr.push(arr[i]);
        } else {
          innerFunction(arr[i]);
        }
      }
    }
    innerFunction(arr);
    return flatArr;
  }

  unFlatten(arr) {
    var output = [[], [], []];
    var j = 0;
    for (var i = 0; i < arr.length; i++) {
      output[j].push(arr[i]);
      if (output[j].length === 3) {
        j++;
      }
    }
    return output;
  }

  changeAutoPlay(flatArr) {
    // remove autoplay from previous first video
    for (var i = 0; i < flatArr.length; i++) {
      console.log(flatArr[i].yUrl.indexOf('?&autoplay=1'))
      if (flatArr[i].yUrl.indexOf('?&autoplay=1') >= 0) {
        var index = flatArr[i].yUrl.indexOf('?&autoplay=1');
        console.log(index)
        flatArr[i].yUrl = flatArr[i].yUrl.slice(0, index);
      }
    }

    // add autoplay to current first video
    flatArr[0].yUrl = flatArr[0].yUrl + '?&autoplay=1';
    return;
  }

  //----------------------------------
  // Mergesort Reverse Functions
  //----------------------------------
  handleMergeSortReverse() {
    var array = this.flatten(this.state.displayed);
    var merged = this.mergeSortReverse(array);
    this.changeAutoPlay(merged);
    merged = this.unFlatten(merged);
    this.setState({
      displayed: merged
    });
  }

  mergeSortReverse(array) {
    if (array.length < 2) {
      return array;
    }

    var cutoff = Math.floor(array.length / 2);

    var arr1 = array.slice(0, cutoff);
    var arr2 = array.slice(cutoff);

    arr1 = this.mergeSortReverse(arr1);
    arr2 = this.mergeSortReverse(arr2);

    var merged = this.merge(arr1, arr2);

    return merged;
  }

  merge(left, right) {
    var i = 0;
    var j = 0;
    var result = [];

    while (i < left.length && j < right.length) {
      if (left[i].Number >= right[j].Number) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }

    var remaining = i === left.length ? right.slice(j) : left.slice(i);

    return result.concat(remaining);
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
              <AlgoExplanations
                handleMergeSortReverse={this.handleMergeSortReverse}
              />
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