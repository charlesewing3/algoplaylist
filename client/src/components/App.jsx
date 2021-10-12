import React from 'react';
import Search from './Search.jsx';
import RelatedItems from './RelatedItems.jsx';
import SavedItems from './SavedItems.jsx';
import sampleData from '../../../sampleData.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      similarArtists: {},
      displayedSimilar: [],
      searchedArtist: {}
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
    axios.get('/similar', {
      params: {
        q: this.state.searchTerm,
        type: 'music',
        verbose: 1
      }
    })
      .then(success => {
        this.setState({
          similarArtists: success.data,
          displayedSimilar: success.data.Similar.Results.slice(0, 3),
          searchedArtist: success.data.Similar.Info[0]
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div id="app-container">
        <div id="header">
          <h1 id="title">New Music Finder</h1>
        <Search
          searchTerm={this.state.searchTerm}
          handleSearchChange={this.handleSearchChange}
          handleSearchSubmit={this.handleSearchSubmit}
        />
        </div>


        {this.state.displayedSimilar.length > 0 ?
          <RelatedItems
            similarArtists={this.state.displayedSimilar}
            searchedArtist={this.state.searchedArtist}
          />
          : null}

        {/* <SavedItems /> */}
      </div>
    )
  }
}

export default App;