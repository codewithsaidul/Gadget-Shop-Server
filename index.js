const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 4000;

// ============ Middleware =============================
app.use(cors());
app.use(express.json());

// ==================== MongoDB =============================
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lggjuua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


const dbConnect = async () => {
    try {
        client.connect();
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.log(error); 
    }
}
dbConnect().catch(console.dir);

// ==================== API =============================
app.get("/", (req, res) => {
  res.send("Welcome to Gadget Shop Server!😊😊");
});

app.listen(port, () => {
  console.log("listening on port", port);
});
