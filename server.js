const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

let students = [];

/* Home page */
app.get("/", (req,res)=>{
res.sendFile(path.join(__dirname,"index.html"));
});

/* Save student */
app.post("/addStudent",(req,res)=>{
students.push(req.body);
res.json({message:"saved"});
});

/* Get students */
app.get("/students",(req,res)=>{
res.json(students);
});

/* Test route */
app.get("/test",(req,res)=>{
res.send("server working");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
console.log("Server running");
});
