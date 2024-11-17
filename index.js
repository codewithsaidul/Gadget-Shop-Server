const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 4000;

// ============ Middleware =============================
app.use(cors());
app.use(express.json());


// ============ Authentication Middleware =============================
//  Verify a User is authenticated ===========
app.post('/authentication', async(req, res) =>{
  const userEmail = req.body;
  const token = jwt.sign(userEmail, process.env.ACCESS_TOKEN, { expiresIn: "30d"});
  res.send( { token } );
})

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




// Databes Connection
const dbConnect = async () => {
  try {
    client.connect();
    
    // ======================== Database Collection =============================
    const userCollection = client.db('gadgetShop').collection('users');
    const productCollection = client.db('gadgetShop').collection('products');


    // ======================== User Related API =================
    // Add New User
    app.post('/users', async (req, res) => {
      const user = req.body;
      const query = { email: user.email};
      const existingUser = await userCollection.findOne(query);

      if(existingUser) {
        return res.status(400).send( { message: 'Email already exists' } );
      }

      const result = await userCollection.insertOne(user);
      res.send(result);
    })

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
