const express = require("express")
const { MongoClient } = require("mongodb")

const app = express()
app.use(express.json())
app.use(express.static("public"))

const uri = "mongodb+srv://abhaymauryafb_db_user:PASSWORD@abhay.m7i5gvj.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri)

let students

async function start(){

await client.connect()

const db = client.db("coachingDB")
students = db.collection("students")

console.log("MongoDB connected")

}

start()

app.post("/addStudent", async(req,res)=>{

await students.insertOne(req.body)

res.send("Student Added")

})

app.get("/students", async(req,res)=>{

let data = await students.find().toArray()

res.json(data)

})

app.listen(3000, ()=>{

console.log("Server running")

})