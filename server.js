const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

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

app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"index.html"));
});

app.post("/addStudent",async(req,res)=>{

await studentsCollection.insertOne(req.body);

res.json({status:"saved"});

});

app.get("/students",async(req,res)=>{

const data = await studentsCollection.find().toArray();

res.json(data);

});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
console.log("Server running");
});
