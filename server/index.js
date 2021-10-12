const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/similar', controller.getAll);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
12