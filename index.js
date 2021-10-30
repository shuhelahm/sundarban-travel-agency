const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors');
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://mydbuser1:lWazaARKV5HXiBFD@cluster0.oesrn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
      await client.connect();
      const database = client.db("sundarban-travel-agency");
      const servicesCollection = database.collection("services");

      // get api
      app.get('/services', async(req, res)=>{
        const cursor = servicesCollection.find({});
        const services = await cursor.toArray();
        res.send(services);
      })

      // post api
      app.post('/services', async(req, res)=>{
        const newUser = req.body;
          console.log('hit the post', req.body)
          const result = await servicesCollection.insertOne(newUser);
          res.json(result);
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