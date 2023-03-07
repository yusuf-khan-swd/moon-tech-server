const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t99wqyy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("moonTech");
    const productCollection = db.collection("product");

    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const product = await cursor.toArray();
      res.send({ status: true, data: product });
    });

    app.post("/product", async (req, res) => {
      const product = req.body;
      const result = await productCollection.insertOne(product);
      res.send(result);
    });

    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(filter);
      res.send(result);
    });
  } finally {
  }
};

run().catch((err) => console.log(err));

app.use("/", (req, res) => {
  res.send("MoonTech Server is running");
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
