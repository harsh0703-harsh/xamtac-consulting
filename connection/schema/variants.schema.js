const mongoose = require("mongoose")
const { Schema } = mongoose;

const variantsSchema = new Schema({
 
    name : String,

    sku : String,

    additional_cost : Number ,

    product : {type: mongoose.Schema.Types.ObjectId, ref: 'products' },

    stock_count : { type : Number , default : 0}


});


const Variants = mongoose.model('variants', variantsSchema);

module.exports = Variants
