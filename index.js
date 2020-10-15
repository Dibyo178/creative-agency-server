const express = require('express')
const app = express()
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');


const port = 5000

app.use(bodyParser.json());
app.use(cors());

console.log('database connected'); 

app.get('/', (req, res) => {

  res.send('Hello World!')
})

app.listen(process.env.PORT || port);