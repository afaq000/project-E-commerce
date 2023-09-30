const  mongoose  = require("mongoose");

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    date: {
        type: Date,
        default: Date.now
      }

})
module.exports=mongoose.model("user",UserSchema)

//this is also true but wehen you export so then you writte model 
// const model=mongoose.model("user",UserSchema)
// module.exports=model;

