// IL9ns3cQkOBoRggH
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://vishwance21:Balderdash%402003@cluster0.83kb0kp.mongodb.net/collection?retryWrites=true&w=majority&appName=Cluster0")
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