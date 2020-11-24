const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const dotenv = require("dotenv").config();
const mongodb = require('mongodb');
const api = require('./routes/api');
const products = require('./routes/products');
const contactus = require('./routes/contactus');


const app = express();
const dburl = process.env.DB_URL || "mongodb://localhost:27017";
const port = process.env.PORT || 4000;
// console.log("env url::", process.env.DB_URL)

//middle ware
app.use(cors());
app.use(bodyparser.json())

//api routes
app.use('/api', api)
app.use('/products', products)
app.use('/requests', contactus)


// function authVerify(req, res, next) {
//     if (req.headers.authorization !== undefined) {
//         let result = await jwt.verify(req.headers.authorization, 'secretkey');
//         next();
//     }
// }


app.listen(port, () => console.log("Server started at port 4000!!!"));