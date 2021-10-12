const axios = require('axios');

exports.getAll = (req, res) => {
  var queryString = req._parsedUrl.path;
  console.log('queryString:', queryString)
  axios.get(`https://tastedive.com/api${queryString}`)
    .then(success => {
      res.send(success.data);
    })
    .catch(err => {
      console.log('err');
    })
}