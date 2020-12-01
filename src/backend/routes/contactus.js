const dotenv = require("dotenv").config();
const mongodb = require('mongodb');
const nodemailer = require('nodemailer');

const client = mongodb.MongoClient;

const dburl = process.env.DB_URL || "mongodb://localhost:27017";
// //const dburl = "mongodb://localhost:27017";

const express = require('express');
let router = express.Router();

// customer api
let contact = router.route('/');


contact.post(async(req, res) => {
    try {
        let connection = await client.connect(dburl, { useUnifiedTopology: true });
        let db = connection.db("rental");
        let data = await db.collection("requests").insertOne(req.body);
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        let mailOptions = {
            from: "krishnakireeti.mamidi@gmail.com",
            to: "krishnakiriti.mamidi@gmail.com",
            subject: "New Request Received",
            html: `<div>
                <p>Hello Krishna,</p>

                <p>We have received a new request with the following details</p>

                <p> <b>Name</b> : ${req.body.name}</p> 
                <p> <b>Email</b> : ${req.body.email}</p> 
                <p> <b>Message</b> : ${req.body.message}</p> 

                <p>Regards,</p>
                <p>Team Rentify</p>
                </div>`
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                res.status(401).json({ status: 401, message: "Error occured while sending mail" })
            } else {
                res.status(200).json({ status: 200, message: "Email sent !!" })
            }
        })
        await connection.close();
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 400, message: "Error while sending mail !!" })
    }
})

module.exports = router;