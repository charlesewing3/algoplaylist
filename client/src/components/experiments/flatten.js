var flatten = function(arr) {
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

var test = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
console.log('should ascend:', flatten(test));