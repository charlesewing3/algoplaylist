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
    this.changeAutoPlay = this.changeAutoPlay.bind(this);

    this.merge = this.merge.bind(this);
    this.mergeSortReverse = this.mergeSortReverse.bind(this);
    this.handleMergeSortReverse = this.handleMergeSortReverse.bind(this);

    this.handleShuffleDeck = this.handleShuffleDeck.bind(this);
    this.shuffleDeck = this.shuffleDeck.bind(this);

    this.handleQuicksort = this.handleQuicksort.bind(this);
    this.quicksort = this.quicksort.bind(this);

    this.handleSpiralTraversal = this.handleSpiralTraversal.bind(this);
    this.spiralTraversal = this.spiralTraversal.bind(this);
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

  // when the order of tracks changes, move the "autoplay" from
  // the previous first track to the new one
  changeAutoPlay(flatArr) {
    // remove autoplay from previous first video
    for (var i = 0; i < flatArr.length; i++) {
      if (flatArr[i].yUrl.indexOf('?&autoplay=1') >= 0) {
        var index = flatArr[i].yUrl.indexOf('?&autoplay=1');
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

  // click handler for the Mergesort Reverse button
  handleMergeSortReverse() {
    var array = this.flatten(this.state.displayed);
    var merged = this.mergeSortReverse(array);
    this.changeAutoPlay(merged);
    merged = this.unFlatten(merged);
    this.setState({
      displayed: merged
    });
  }

  // splits array into halves, sorts them with helper fn
  // and re-merges in order
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

  // merges the two halves
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


  //----------------------------------
  // Shuffle Deck Functions
  //----------------------------------

  // flatten, shuffle, change auto play, unflatten, set state
  handleShuffleDeck() {
    var array = this.flatten(this.state.displayed);
    var shuffled = this.shuffleDeck(array);
    this.changeAutoPlay(shuffled);
    shuffled = this.unFlatten(shuffled);
    this.setState({
      displayed: shuffled
    });
  }

  shuffleDeck(deck) {
    var num = deck.length;
    while (num > 0) {
      var index = Math.floor(Math.random() * num);
      var temp = deck[index];
      deck.splice(index, 1);
      deck.push(temp);
      num--;
    }
    return deck;
  };


  //----------------------------------
  // Quicksort Ascent Functions
  //----------------------------------
  handleQuicksort() {
    var array = this.flatten(this.state.displayed);
    var sorted = this.quicksort(array);
    this.changeAutoPlay(sorted);
    sorted = this.unFlatten(sorted);
    this.setState({
      displayed: sorted
    });
  }

  quicksort(array) {
    var pivot = array[0];
    var smaller = [];
    var larger = [];
    for (var i = 1; i < array.length; i++) {
      if (array[i] <= pivot) {
        smaller.push(array[i]);
      } else {
        larger.push(array[i]);
      }
    }
    if (smaller.length > 1) {
      smaller = this.quicksort(smaller);
    }
    if (larger.length > 1) {
      larger = this.quicksort(larger);
    }
    smaller.push(pivot);
    return smaller.concat(larger);
  };


  //----------------------------------
  // Spiral Functions
  //----------------------------------

  handleSpiralTraversal() {
    var array = this.state.displayed;
    var spiraled = this.spiralTraversal(array);
    this.changeAutoPlay(spiraled);
    spiraled = this.unFlatten(spiraled);
    this.setState({
      displayed: spiraled
    });
  }

  spiralTraversal(input) {
    var output = [];
    while (input.length > 0) {
      // add first row
      output = output.concat(input[0]);
      input = input.slice(1);
      // add right vertical down
      if (input.length > 0) {
        for (var i = 0; i < input.length; i++) {
          output.push(input[i][input[i].length - 1]);
          input[i] = input[i].slice(0, input[i].length - 1);
        }
        // if the first inner array is now empty, break because all elements have been pushed
        if (input[0].length === 0) {
          break;
        }
        // add last row backwards
        if (input.length > 0) {
          var last = input[input.length - 1];
          for (var i = last.length - 1; i >= 0; i--) {
            output.push(last[i]);
          }
          input = input.slice(0, input.length - 1);
        }
        // add left vertical up
        if (input.length > 0) {
          for (var i = input.length - 1; i >= 0; i--) {
            output.push(input[i][0]);
            input[i] = input[i].slice(1);
          }
          // if the first inner array is now empty, break because all elements have been pushed
          if (input[0].length === 0) {
            break;
          }
        }
      }
    }
    return output;
  };

  render() {
    return (
      <div id="app-container">
        <div id="header">
          <div id="title-subtitle">
            <h1 id="title">The Algorithmic Playlist</h1>
            <h3 id="subtitle">Discover new artists. <br></br> Shuffle tracks with your favorite sorting algorithms.</h3>
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
                name={this.state.searchedArtist.Name}
                number={this.flatten(this.state.displayed).length}
                handleMergeSortReverse={this.handleMergeSortReverse}
                handleShuffleDeck={this.handleShuffleDeck}
                handleQuicksort={this.handleQuicksort}
                handleSpiralTraversal={this.handleSpiralTraversal}
              />
              <RelatedItems
                similarArtists={this.state.displayed}
                searchedArtist={this.state.searchedArtist}
                />
              <CurrentItem artist={this.state.searchedArtist}/>
              </div>
              : null}

            {/* <SavedItems playlist={this.state.playlist}/> */}
      </div>
    )
  }
}

export default App;