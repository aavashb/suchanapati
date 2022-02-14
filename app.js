const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require("body-parser");
const app = express();
const port = 80;
const nodeMailer = require("nodemailer");
const { attachment } = require('express/lib/response');


app.use(bodyParser.urlencoded({ extended: true }))
app.use('/static', express.static('static'));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/views/index.html'));
})
app.get('/citizenship', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/views/citizenship.html'));
})
app.get('/complaint', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/views/complaint.html'));
})


app.post('/complaint', (req, res) => {
    let userName = req.body.name;
    res.redirect('/');


    let transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: "suchanapati2078@gmail.com ",
            pass: "kidshate9"
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    let mailOptions = {
        from: "suchanapati2078@gmail.com",
        to: "baralaavas@gmail.com",
        subject: `Complaint by ${userName}`,
        text: `
               Name : ${userName}
               Email: ${req.body.mail}
               Phone : ${req.body.phone}
               Problem: ${req.body.problem}`,

        
    }

    transporter.sendMail(mailOptions, function (err, success) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Email was successfully sent!!!!");
        }
    })

    
})





app.listen(port, () => {
    console.log(`The app is running at ${port}`)
})

