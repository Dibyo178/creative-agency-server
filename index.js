const express = require('express');
require('dotenv').config();
const bodyParser=require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send("hello from db it's working")
})


app.use(bodyParser.json());
app.use(cors());



const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.i7d38.mongodb.net:27017,cluster0-shard-00-01.i7d38.mongodb.net:27017,cluster0-shard-00-02.i7d38.mongodb.net:27017/creativeAgency?ssl=true&replicaSet=atlas-123ytz-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });




client.connect(err => {
  const serviceCollection = client.db("creativeAgency").collection("services");
  const orderCollection = client.db("creativeAgency").collection("order");
  const ClientFeedbackCollection = client.db("creativeAgency").collection("ClientFeedback");
  const adminCollection = client.db("creativeAgency").collection("admin");
  console.log('database connect');

   app.post('/addServices',(req,res)=>{
     const service=req.body;
   
     serviceCollection.insertMany(service)
     .then(result=>{
       console.log(result.insertedCount);
       res.send(result.insertedCount)

     })

   })    

   app.get('/services', (req, res) => {
    serviceCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
        })
})


app.post('/OrderCollection', (req, res) => {
  const event = req.body;
  orderCollection.insertOne(event)
      .then(result => {
          console.log(result)
          res.send(result)
      })
})

app.get('/order', (req, res) => {
  orderCollection.find({email: req.query.email})
      .toArray((err, documents) => {
          res.send(documents)
      })
})
app.post('/clientFeedback', (req, res) => {
  const event = req.body;
  ClientFeedbackCollection.insertOne(event)
      .then(result => {
          console.log(result)
          res.send(result)
      })
})

app.get('/SelectedClientFeedback', (req, res) => {
  ClientFeedbackCollection.find({})
      .toArray((err, documents) => {
          res.send(documents)
      })
})

app.post('/ServiceAdd', (req, res) => {
    const event = req.body;
    serviceCollection.insertOne(event)
        .then(result => {
            console.log(result)
            res.send(result)
        })
  })

  app.post('/addAdmin', (req, res) => {
    const event = req.body;
    adminCollection.insertOne(event)
        .then(result => {
            console.log(result)
            res.send(result)
        })
})
app.get('/allAdmin', (req, res) => {
    adminCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
        })
})



});

app.listen(process.env.PORT || port);


