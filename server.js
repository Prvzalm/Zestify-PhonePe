const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
require("dotenv").config();
const proxy = require('express-http-proxy')('http://localhost:3000');

app.use(express.json());  
app.use(cors());
const bodyParser = require('body-parser');

app.use(express.static('build'))

// Parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

//Razorpay Route
const phonepeRoute = require('./routes/phonepe/phonepeRoute')
app.use("/api", phonepeRoute);

//proxy for backend
app.use('/api', proxy);

// Starting Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
