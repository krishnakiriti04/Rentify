const dotenv = require("dotenv").config();
const mongodb = require('mongodb');
const client = mongodb.MongoClient;

const dburl = process.env.DB_URL || "mongodb://localhost:27017";

const express = require('express');
let router = express.Router();

// customer api
let products = router.route('/');
//let modifyTicket = router.route('/:id');
//console.log("env url in products::", dburl);

products.get(async(req, res) => {
    try {
        let connection = await client.connect(dburl, { useUnifiedTopology: true })
        let db = connection.db('rental');
        let data;
        if (req.query) {
            if (req.query.seater) req.query.seater = parseInt(req.query.seater);
            data = await db.collection('products').find(req.query).toArray();
            //console.log("data", data);
        } else {
            data = await db.collection('products').find().toArray();
        }
        if (data) {
            res.json({
                data,
                status: 200,
                message: "Fetched products data from DB"
            })
        } else {
            res.json({
                status: 401,
                message: "Some Issue while fetching the products data!!"
            })
        }
        connection.close();
    } catch (error) {
        console.log("Fetching products Error :", error)
    }
})


// products.put(async(req, res) => {
//     try {
//         let connection = await client.connect(dburl, { useUnifiedTopology: true })
//         let db = connection.db('rental');
//         let data = await db.collection('products').find(req.body).toArray();
//         if (data) {
//             res.json({
//                 data,
//                 status: 200,
//                 message: "Fetched filtered products data from DB"
//             })
//         } else {
//             res.json({
//                 status: 401,
//                 message: "Some Issue while fetching the filtered products data!!"
//             })
//         }
//         connection.close();
//     } catch (error) {
//         console.log("Fetching filtered products Error :", error)
//     }
// })



products.post(async(req, res) => {
    try {
        let connection = await client.connect(dburl, { useUnifiedTopology: true })
        let db = connection.db('rental');
        let data = await db.collection('products').insertOne(req.body);
        if (data) {
            res.json({
                status: 200,
                message: "New product added"
            })
        } else {
            res.json({
                status: 401,
                message: "Some Issue while inserting the product!!"
            })
        }
        connection.close();
    } catch (error) {
        res.json({ status: 401, message: "Catched the error while inserting data" })
    }
})


module.exports = router;