const randomString = require("randomstring");
const Variants = require("../connection/schema/variants.schema");

const skuGenerate = async ()=>{

    const str  = randomString.generate(10);

    const isUsed = await Variants.findOne( { sku : str } )

    if(isUsed){

        return skuGenerate()

    }else{
        return str
    }
}


module.exports = skuGenerate