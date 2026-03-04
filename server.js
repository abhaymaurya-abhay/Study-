const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");

const app = express();

/* ---------- Middleware ---------- */
app.use(express.json());
app.use(express.static(__dirname));

/* ---------- MongoDB ---------- */
const uri = "mongodb+srv://abhaymauryafb_db_user:Z7T209jAG8yBAcoq@abhay.m7i5gvj.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

let studentsCollection;

async function start(){
  await client.connect();
  const db = client.db("studentDB");
  studentsCollection = db.collection("students");
  console.log("MongoDB Connected");
}
start();

/* ---------- Routes ---------- */

/* Home page */
app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname,"index.html"));
});

/* Add Student */
app.post("/addStudent", async (req,res)=>{
  try{
    await studentsCollection.insertOne(req.body);
    res.json({message:"saved"});
  }catch(e){
    console.log(e);
    res.status(500).json({error:"save failed"});
  }
});

/* Get Students */
app.get("/students", async (req,res)=>{
  try{
    const data = await studentsCollection.find().toArray();
    res.json(data);
  }catch(e){
    console.log(e);
    res.status(500).json([]);
  }
});

/* ---------- Server ---------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
  console.log("Server running on port " + PORT);
});
