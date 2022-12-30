const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT ||  5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.4nt1ond.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


async function run (){
    try{
        const sectorCollection = client.db("tableData").collection("sectors");

        app.post("/sector", async(req, res)=>{
            const sector = req.body;
            const result = await sectorCollection.insertOne(sector);
            res.send(result);
        })

        app.get("/sector", async(req, res)=>{
            const query = {};
            const result = await sectorCollection.find(query).toArray();
            res.send(result);
        })

        app.get("/sector/:id", async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await sectorCollection.findOne(query);
            res.send(result);
        })

        app.put("/sector/:id", async (req, res) => {
          const id = req.params.id;
          console.log(id)
          const result = await sectorCollection.updateOne(
            { _id: ObjectId(id) },
            { $set: req.body }
          );
          res.send(result);
        });

    }
    finally{

    }
}
run().catch(e => console.log(e))




app.get("/", (req, res)=>{
    res.send("Select Sector Data is Coming Coming!!")
})
app.listen(port, ()=>{
    console.log(`Your Available Port are ${port}`);
})