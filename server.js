/**
  This file is where most if not all of our backend code lies.
  Most of our site interactions with outside APIs occur here as well
  as the code for starting the server. Below you can find instructions
  for how to start this webapp on your own device.
*/


// Prerequisites - first run:
//   npm install
//
// which will look in package.json and install all dependencies
// (e.g., express)
//
// To start the server, run node server.js in Git Bash
// and open the frontend webpage at http://localhost:3000/index.html/

let express = require('express');
let app = express();
let path = require('path');

app.use('/01-html', express.static('static_files'));
// app.use(express.static(path.join(__dirname, 'static_files')));
app.use(express.static('static_files'));

app.listen(3000, () => console.log('Server started at http://localhost:3000/index.html'));
