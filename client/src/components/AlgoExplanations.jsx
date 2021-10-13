import React from 'react';

function AlgoExplanations({name, number, handleMergeSortReverse, handleShuffleDeck, handleQuicksort, handleSpiralTraversal}) {
    return (
      <div className="wrapper">
        <div id="current-item-container">
          <h1 className="heading1">So, how does this work?</h1>
          <div id="algo-instructions">
            <p>Your search has returned <b>{number}</b> videos similar to <b>{name}</b>. Behind the scenes, these videos are stored in a two-dimensional array: one parent array holds multiple sub-arrays, each representing a single row. The blue numbers in each box indicate the order in which the tracks were returned from the API. Change the order of your playlist using the following sorting algorithms! </p>

            <div id="algo-options">

                <div id="first">
                  <b>Mergesort Reverse</b>
                  <ul>
                    <li><b>Mergesort</b> to put tracks in descending order</li>
                    <li>Avg Time: O(log(n))</li>
                    <li>Avg Space: O(n)</li>
                    <li>Results: [[9, 8, 7], [6, 5, 4], [3, 2, 1]]</li>
                  </ul>
                <button onClick={handleMergeSortReverse}>Try it!</button>
                <br></br>
                <br></br>
                </div>

                <div id="second">
                  <b>Shuffle Deck</b>
                  <ul>
                    <li><b>Shuffle</b> the tracks to a random order</li>
                    <li>Avg Time: O(n)</li>
                    <li>Avg Space: O(1)</li>
                    <li>Results: [[?, ?, ?], [?, ?, ?], [?, ?, ?]]</li>
                  </ul>
                <button onClick={handleShuffleDeck}>Try it!</button>
                </div>

                <div id="third">
                  <b>Viral Spiral</b>
                  <ul>
                    <li><b>Spiral</b> through the current order, starting from the top left</li>
                    <li>Avg Time: </li>
                    <li>Avg Space: </li>
                    <li>Results: [[1, 2, 3], [6, 9, 8], [7, 4, 5]]</li>
                  </ul>
                <button onClick={handleSpiralTraversal}>Try it!</button>
                <br></br>
                <br></br>
                </div>

                <div id="fourth">
                  <b>Quicksort Ascent</b>
                  <ul>
                    <li>Use <b>quicksort</b> to restore the original order</li>
                    <li>Avg Time: O(log(n))</li>
                    <li>Avg Space: O(log(n))</li>
                    <li>Results: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]</li>
                  </ul>
                <button onClick={handleQuicksort}>Try it!</button>
                </div>

              </div>

          <div>View project code here: https://github.com/charlesewing3/mvp.git</div>
            </div>

          </div>
      </div>
  )
}

export default AlgoExplanations;