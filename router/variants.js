const express = require("express");
const Variants = require("../connection/schema/variants.schema");
const skuGenerate = require("../utils/sku");
const Products = require("../connection/schema/product.schema");
const authenticate = require("../middleware/authenticate")
const variants = express.Router()

variants.post("/:productId", authenticate ,async (req, res) => {


    try {

        const prodId = req.params.productId

        const { name, additional_cost } = req.body

        if (!name || !additional_cost) {

           return res.status(400).send("Please fill the required details..")

        } else {


            const product = await Products.findById(prodId)

            if (!product) {

              return  res.status(400).send("the product is not valid ")

            } else {

                const isNameFound = await Variants.findOne({ name: name });

                if (isNameFound) {

                    return res.status(400).send("Variant Name is already used..")

                } else {

                    await Products.findByIdAndUpdate(prodId, { $inc: { variants: 1 } })

                    const str = await skuGenerate();

                    const result = await Variants.create({

                        sku: str,
                        product: prodId,
                        ...req.body

                    })

                    return res.status(200).send(result)


                }

            }

        }

    } catch (err) {

        return res.status(400).send(err)

    }


})


variants.patch("/:variantId", authenticate ,async (req, res) => {

    try {

        const id = req.params.variantId;
        const body = req.body;

        delete body.product
        delete body.sku

        const result = await Variants.findByIdAndUpdate(id, body, { new: true });

        if (!result) {

            return res.status(400).send("cannot find variant")

        } else {

            res.status(200).send(result)
        }

    } catch (err) {

        return res.status(400).send(err)

    }

})


variants.get('/:productId', authenticate ,async (req, res) => {

    try {

        const prodId = req.params.productId;

        const items = await Variants.find({ product: prodId });

        if (items.length == 0) {

            return res.status(400).send("variants not found..")

        } else {

            return res.status(200).send(items)

        }

    } catch (err) {

        return res.status(400).send(err)

    }


})

variants.delete('/:productId', authenticate ,async (req, res) => {

    try {

        const prodId = req.params.productId;

        const item = await Variants.findByIdAndDelete(prodId);

        if (!item) {

            return res.status(400).send("variants not found..")

        } else {

            return res.status(200).send(item)

        }

    } catch (err) {

        return res.status(400).send(err)

    }


})


module.exports = variants