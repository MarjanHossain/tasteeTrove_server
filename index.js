const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

//---------MiddleWare----------//
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Hotel Management server is running")
})
//? ________________Connect Database_____________________//

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.osbervi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// testeeTrove
// iaIrf1sL2hIDVmk5
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const foodCollection = client.db('foodDb').collection('foods');
    // post one data in dataBase//
    // app.post('/foods', async (req, res) => {
    //   const food = req.body;
    //   console.log("all foods", food)
    //   const result = await foodCollection.one(food);
    //   res.send(result);
    // })


    //? post Many data in dataBase//
    

    app.post('/foods', async (req, res) => {
      const food = req.body;
      console.log("all foods", food)
      const result = await foodCollection.insertMany(food);
      res.send(result);
    })

    //? -------------GET Data------------/
    app.get('/foods', async (req, res) => {
      const cursor = foodCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })


    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


//__________________________________________________________________//
app.listen(port, (req, res) => {
    console.log(`Hotel Management server is running on port ${port}`)
})