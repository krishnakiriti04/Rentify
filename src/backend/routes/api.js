const express = require('express');
//const bcrypt = require('bcrypt');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const client = mongodb.MongoClient;


const dburl = process.env.DB_URL || "mongodb://localhost:27017";

let router = express.Router();

// login api
let login = router.route('/login');

//signup api
let register = router.route('/register');

login.get((req, res) => {
    res.send("Hello World");
})

login.post(async(req, res) => {
    try {
        let connection = await client.connect(dburl, { useUnifiedTopology: true });
        let db = connection.db('rental');
        let data = await db.collection('users').findOne({ email: req.body.email });
        if (data) {
            let compare = await bcrypt.compare(req.body.password, data.password);
            if (compare) {
                let token = await jwt.sign({ data }, 'secretkey', { expiresIn: '1h' });
                res.status(200).json({ status: 200, message: "Login Success!!", token: token, userDetails: data });
            } else {
                res.status(400).json({ status: 400, message: "Login Failed!!" });
            }
        } else {
            res.status(401).json({ status: 401, message: "Email not registered!" })
        }
        await connection.close();
    } catch (error) {
        console.log('Login Error :' + error);
    }
})


register.post(async(req, res) => {
    try {
        let connection = await client.connect(dburl, { useUnifiedTopology: true });
        let db = connection.db("rental");
        let data = await db.collection("users").findOne({ email: req.body.email })
        if (data) {
            res.status(400).json({ status: 400, message: "User already exists" });
        } else {
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(req.body.password, salt);
            req.body.password = hash;
            await db.collection("users").insertOne(req.body);
            res.status(200).json({
                status: 200,
                message: "Registration Successful"
            });
        }
        await connection.close();
    } catch (error) {
        console.log("Registration error: " + error);
    }
})

module.exports = router;