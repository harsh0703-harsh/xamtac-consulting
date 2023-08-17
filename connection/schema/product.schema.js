const mongoose = require("mongoose")
const { Schema } = mongoose;

const productSchema = new Schema({
 
    name : String,

    description : String,

    price : Number ,


    variants : { type : Number , default : 0}


});


const Products = mongoose.model('products', productSchema);

module.exports = Products
