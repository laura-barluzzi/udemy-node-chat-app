const path = require('path');
var express = require('express');
const port = process.env.PORT || 8080;

const publicPath = path.join(__dirname, '../public');


var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});