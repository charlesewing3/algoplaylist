import React from 'react';
import Search from './Search.jsx';
import RelatedItems from './RelatedItems.jsx';
import SavedItems from './SavedItems.jsx';
import sampleData from '../../../sampleData.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      similarArtists: sampleData.Similar.Results,
      displayedSimilar: sampleData.Similar.Results.slice(0, 3),
      searchedArtist: sampleData.Similar.Info[0]
    }
  }

  render() {
    return (
      <div id="app-container">
        <h1 id="title">New Music Finder</h1>
        <Search />
        <RelatedItems similarArtists={this.state.displayedSimilar} searchedArtist={this.state.searchedArtist}/>
        {/* <SavedItems /> */}
      </div>
    )
  }
}

export default App;