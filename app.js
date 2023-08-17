const express = require("express");
const product = require("./router/products");
const variants = require("./router/variants");
const authentication = require("./router/authentication");

require("./connection/conn")

const app = express()


app.use(express.json())

app.use("/product",product)
app.use('/variants',variants)
app.use('/auth',authentication)


module.exports = app.listen(3000,()=>{
    console.log(' The app is running on 3000 port ')
})
