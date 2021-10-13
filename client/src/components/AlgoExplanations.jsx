import React from 'react';
// import spiral from '../../dist/images/spiral1.jpeg';

function AlgoExplanations({name, number, handleMergeSortReverse, handleShuffleDeck, handleQuicksort, handleSpiralTraversal}) {
    return (
      <div className="wrapper">
        <div id="current-item-container">
          <h1 className="heading1">So, how does this work?</h1>
          <div id="algo-instructions">
            <p>Your search has returned <b>{number}</b> videos similar to <b>{name}</b>. Behind the scenes, these videos are stored in a two-dimensional array: one parent array holds multiple sub-arrays, each representing a single row. The blue numbers in each box indicate the order in which the tracks were returned from the API. Change the order of your playlist using the following sorting algorithms! </p>

            <div id="algo-options">

                <div id="first">
                  <b className="tooltip">Mergesort
                    <span className="tooltiptext">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Merge_sort_algorithm_diagram.svg/300px-Merge_sort_algorithm_diagram.svg.png" />
                    </span>
                  </b>
                  <ul>
                    <li><b>Descending</b> order</li>
                    <li>Avg Time: O(log(n))</li>
                    <li>Avg Space: O(n)</li>
                    <li>Results: [[9, 8, 7], [6, 5, 4], [3, 2, 1]]</li>
                  </ul>
                <button onClick={handleMergeSortReverse}>Try it!</button>
                <br></br>
                <br></br>
                </div>

                <div id="second">
                  <b className="tooltip">Shuffle
                    <span className="tooltiptext">
                      <img src="https://www.researchgate.net/publication/327597003/figure/tbl1/AS:670022447951885@1536757208251/Fisher-Yates-Shuffle-Algorhytm.png"  height="350px"/>
                    </span>                  </b>
                  <ul>
                    <li><b>Random</b> order</li>
                    <li>Avg Time: O(n)</li>
                    <li>Avg Space: O(1)</li>
                    <li>Results: [[?, ?, ?], [?, ?, ?], [?, ?, ?]]</li>
                  </ul>
                <button onClick={handleShuffleDeck}>Try it!</button>
                </div>

                <div id="third">
                  <b className="tooltip">Spiral
                    <span className="tooltiptext">
                      <img src="https://assets.leetcode.com/uploads/2020/11/13/spiral1.jpg"/>
                    </span>
                  </b>
                  <ul>
                    <li><b>Spiral</b> order, starting from current top left</li>
                    <li>Avg Time: O(m * n)</li>
                    <li>Avg Space: O(n)</li>
                    <li>Results: [[1, 2, 3], [6, 9, 8], [7, 4, 5]]</li>
                  </ul>
                <button onClick={handleSpiralTraversal}>Try it!</button>
                <br></br>
                <br></br>
                </div>

                <div id="fourth">
                  <b className="tooltip">Quicksort
                    <span className="tooltiptext">
                      <img src="https://res.cloudinary.com/nlogn/images/w_505,h_634/f_auto,q_auto/v1588661780/quick-sort-1/quick-sort-1.png?_i=AA" height="350px"/>
                    </span>
                  </b>
                  <ul>
                    <li><b>Ascending</b> order</li>
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