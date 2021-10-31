const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const cors = require('cors');
const { query, application } = require('express');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oesrn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
      await client.connect();
      const database = client.db("sundarban-travel-agency");
      const servicesCollection = database.collection("services");
      const orderCollection = database.collection('orders');
      console.log('database connected')

      // get api
      app.get('/services', async(req, res)=>{
        const cursor = servicesCollection.find({});
        const services = await cursor.toArray();
        res.send(services);
      })

      app.get('/services/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const service = await servicesCollection.findOne(query);
        res.send(service);
      })

      // post api
      app.post('/services', async(req, res)=>{
        const newUser = req.body;
          console.log('hit the post', req.body)
          const result = await servicesCollection.insertOne(newUser);
          res.json(result);
      })

      // add orders api
      api.post('/orders', async(req,res)=>{
        const order = req.body;
        console.log('order', order)
        res.send('order processed')
      })
    } finally {
      // await client.close();
    }
  }
  run().catch(console.dir);


app.get('/', (req,res)=>{
    res.send('running server')
})

app.listen(port, ()=>{
    console.log('running server on port', port)
})