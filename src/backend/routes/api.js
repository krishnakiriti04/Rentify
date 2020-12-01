const express = require('express');
const bcrypt = require('bcrypt');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const Razorpay = require("razorpay");
const client = mongodb.MongoClient;


//-------------------TOC-------------------
// 1.login Api("/login")
// 2.Register Api ("/register")
// 3.RazorPay integration api
//-------------------END OF TOC-------------------


const dburl = process.env.DB_URL || "mongodb://localhost:27017";
//const dburl = "mongodb://localhost:27017";

let router = express.Router();

// login api
let login = router.route('/login');

//signup api
let register = router.route('/register');

login.get((req, res) => {
    res.send("Login API");
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

//razorpay secret keys
const keys = {
    id: 'rzp_test_5ZzNWVi2y3Kd07',
    secretkey: 'VWaUdZdgGhgGKXsCIcXC6c9W'
}

//creating the instance
const razorInstance = new Razorpay({
    key_id: keys.id,
    key_secret: keys.secretkey
})


router.get("/orders", async(req, res) => {
    try {
        var options = {
            amount: 50000, // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        razorInstance.orders.create(options, function(err, order) {
            if (err) res.status(401).json({ message: "something went wrong with order generation" })
            return res.status(200).json({ status: 200, message: "order created successfully" });
        });
    } catch (error) {
        res.status(402).json({ status: 402, message: "something wrong with order generation" })
    }
})


router.post("/capture/:paymentId", async(req, res) => {
    try {
        return await fetch(`https://${keys.id}:${keys.secretkey}@api.razorpay.com/v1//payments/${req.params.paymentId}/capture`, {
                method: "POST",
                form: {
                    amount: 5000 * 100,
                    currency: "INR"
                }
            },
            (err, res, body) => {
                if (err) {
                    return res.status(400).json({ status: 400, message: "some Error" })
                } else {
                    res.json({ status: 200, message: body })
                }
            }
        )
    } catch (err) {
        return res.status(401).json({ message: "some error in catch" })
    }
})


module.exports = router;