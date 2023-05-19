const express = require('express');
const dontenv = require('dotenv');

// Configuration
dontenv.config();

// Create Express
/*
 * app is an instance of express
 */
const app = express();
const port = process.env.PORT || 8000;

//
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`[ NodeJs - Listening ] Example app listening on port http://localhost:${port}`);
});
