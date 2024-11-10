const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const port = 8000;

app.use(express.urlencoded({extended: true}));

 mongoose.connect('mongodb://localhost/contactDance')
 .then(()=>{
    console.log("Database connection done")
 }).catch(()=>{
    console.log("Something went wrong")
 })

//Define mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone:Number,
    email: String,
    address : String,
    concern : String
})

const Contact =  mongoose.model("contact", contactSchema);


//EXPRESS SPECIFIC STUFF
app.use("/static" , express.static("static"));      //Serving static files
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set("view engine ", "pug");     //set the template engine as pug
app.set("views engine ",path.join(__dirname , "views"));    //set the views directory

//ENDPOINTS
app.get("/" , (req , res)=>{
    const para = {};
    res.status(200).render("home.pug" , para);
});

app.get("/about" , (req , res)=>{
    const para = {};
    res.status(200).render("about.pug" , para);
});

app.get("/contact" , (req , res)=>{
    const para = {};
    res.status(200).render("contact.pug" , para);
});

app.post("/contact" , async(req , res)=>{
    var myData = new Contact(req.body)
    await myData.save()
    res.send("This item has been saved to the database")
})


//START THE SERVER
app.listen(port , ()=>{
    console.log(`The application started successfully on port ${port}`);
})