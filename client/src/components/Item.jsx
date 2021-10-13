import React from 'react';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bioClicked: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      bioClicked: !prevState.bioClicked
    }))
  }



  render() {
    return (
      <div className="item-container">
        <div>
          <h2 className="name">{this.props.artist.Name.slice(0, 17)}</h2>
          {this.props.artist.Name.length > 17 ? <h2 className="name">...</h2> : null}
          <h2 className="num">#{this.props.artist.Number}</h2>
        </div>

        {!this.state.bioClicked ?
          <u onClick={this.handleClick}>About</u> :

          <div>
          {this.props.artist.wTeaser !== "" ?
          <div className="bio">{this.props.artist.wTeaser}</div> :
          <div>Bio not available</div>
        }
        <u onClick={this.handleClick}>Show Less</u>
        </div>

        }




        {this.props.artist.yUrl ? <iframe src={this.props.artist.yUrl} allow="autoplay"></iframe> : null}

        {/* <button>Save</button> */}
      </div>
     )
  }
}

export default Item;