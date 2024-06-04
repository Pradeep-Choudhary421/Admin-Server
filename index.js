const express = require('express');
const mongoose = require('mongoose');
const UserRoutes = require("./Routes/UserRoutes"); 
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
require("dotenv").config()


app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.json({extended:true,limit:"5mb"}))
app.use(bodyParser.urlencoded({extended:true,limit:"5mb"}))
app.use(express.json({extended:true,limit:"5mb"}))
app.use(express.urlencoded({extended:true,limit:"5mb"}))
app.use("/user",UserRoutes);
app.use("/", (req, res) => {
    res.send(`Server is up and running.`)
})

mongoose.connect(process.env.MONGODB_)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("=====>server is up and running on port 8080");
    })
})
.catch((error)=>{
    console.log("error=====>:  " + error.message  ); 
})

function sendmail() {
    let mailTransporter = nodemailer.createTransport ({
        service : "gmail",
        auth : {
            user : "pradeep9783552320@gmail.com",
            pass : "amtb ohys vkcl tgya",
        }
    });
    let mailingDeatils = {
        from : "pradeep9783552320@gmail.com",
        to : "jatinsharma2732@gmail.com",
        subject : "OTP to reset your password",
        text : 'Hello World'
    };

    mailTransporter.sendMail(mailingDeatils, function (err, data) {
        if (err) {
            console.log("error occured ", err.message)
        } else {
            console.log('Email sent successfully');
        }
    })
}
// sendmail();