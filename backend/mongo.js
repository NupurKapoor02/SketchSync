// IL9ns3cQkOBoRggH
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://vishwance21:IL9ns3cQkOBoRggH@cluster0.83kb0kp.mongodb.net/")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('mongodb failed');
})


const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collection",newSchema)

module.exports=collection;