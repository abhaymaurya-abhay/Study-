const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");

const app = express();

/* ---------- Basic Middleware ---------- */
app.use(express.json());
app.use(express.static(__dirname));

/* ---------- MongoDB Connection ---------- */
const uri = "mongodb+srv://abhaymauryafb_db_user:Z7T209jAG8yBAcoq@abhay.m7i5gvj.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

let studentsCollection;

/* Connect to MongoDB */
async function startServer(){

await client.connect();

const db = client.db("studentDB");

studentsCollection = db.collection("students");

console.log("MongoDB connected");

}

startServer();

/* ---------- Routes ---------- */

/* Home page */
app.get("/", (req,res)=>{
res.sendFile(path.join(__dirname,"index.html"));
});

/* Add student */
app.post("/addStudent", async(req,res)=>{

try{

const student=req.body;

await studentsCollection.insertOne(student);

res.json({status:"success"});

}catch(err){

console.log(err);

res.json({status:"error"});

}

});

/* Get students list */
app.get("/students", async(req,res)=>{

try{

const data=await studentsCollection.find().toArray();

res.json(data);

}catch(err){

console.log(err);

res.json([]);

}

});

/* ---------- Server ---------- */

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
console.log("Server running on port "+PORT);
});
