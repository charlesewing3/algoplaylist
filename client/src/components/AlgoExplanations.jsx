import React from 'react';

function AlgoExplanations({handleMergeSortReverse}) {
    return (
      <div className="wrapper">
        <div id="current-item-container">
          <h1 className="heading1">Algorithm Explanations</h1>
          <div id="algo-instructions">
            <p>The videos below are stored in a two-dimensional array: one outer array contains three arrays with three videos each. The blue numbers reflect the order in which they were returned from the API. Change the order of your playlist with the following algorithms! </p>

            <div id="algo-options">

                <div id="first">
                  <b>Mergesort Reverse:</b>
                  <ul>
                    <li>use merge sort to put videos in descending order</li>
                    <li>O(log(n)) time, O(n) space</li>
                    <li>[[9, 8, 7] [6, 5, 4], [3, 2, 1]]</li>
                  </ul>
                <button onClick={handleMergeSortReverse}>Try it!</button>
                <br></br>
                <br></br>
                </div>

                <div id="second">
                  <b>Shuffle Deck:</b>
                  <ul>
                    <li>like shuffle deck - randomizes the order</li>
                    <li>O(n) time, O(1) space</li>
                    <li>[[?, ?, ?], [?, ?, ?], [?, ?, ?]]</li>
                  </ul>
                <button>Try it!</button>
                </div>

                <div id="third">
                  <b>Viral Spiral:</b>
                  <ul>
                    <li>traverses the 2 dimen</li>
                    <li>?? time, ?? space</li>
                    <li>[[1, 2, 3] [6, 9, 8] [7, 4, 5]]</li>
                  </ul>
                <button>Try it!</button>
                <br></br>
                <br></br>
                </div>

                <div id="fourth">
                  <b>Binary Ascent:</b>
                  <ul>
                    <li>uses binary sort to return to original order</li>
                    <li>O(log(n)) time, XXX space</li>
                    <li>[[1, 2, 3], [4, 5, 6], [7, 8, 9]]</li>
                  </ul>
                <button>Try it!</button>
                </div>

              </div>

            </div>

          </div>
        </div>
  )
}

export default AlgoExplanations;