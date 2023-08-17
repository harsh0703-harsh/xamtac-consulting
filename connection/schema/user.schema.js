const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
 
    email : {type : String , required : true , unique : true},

    first_name : String,

    last_name : String,

    age : Number ,

    password : String,

    status : { type : String, default : "active"}


});


const Users = mongoose.model('users', userSchema);

module.exports = Users
