const express = require('express');
const path = require('path');
const fs = require('fs');
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
    res.status(200).sendFile(path.join(__dirname, '/views/citizen.html'));
})
app.get('/birth', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/views/birth.html'));
})
app.get('/passport', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/views/passport.html'));
})
app.get('/complaint', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/views/complaint.html'));
})


app.post('/complaint', (req, res) => {
    let userName = req.body.name;

    res.send(`
    <!DOCTYPE html>
    <html>;
    <body>

        <span style="font-family:consolas">Thanks for filing the complaint. Redirecting into home page in 5s.</span>

        <script>
	
            setTimeout(() => {
            window.location.href="/";
        
            }, 5000);

	
        </script>

    </body>
    </html>
    `)
    
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

    
    let rMailOptions = {
        from: "suchanapati2078@gmail.com",
        to: `${req.body.mail}`,
        subject: `Thanks for filing a complaint`,
        text: `
        Thank you ${userName} for your complaint. We will look forward to it soon.Check your email within 24hrs for the solution to your problem.`,

        
    }


    transporter.sendMail(mailOptions, function (err, success) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Email was successfully sent!!!!");
        }
    })
    transporter.sendMail(rMailOptions, function (err, success) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("REmail was successfully sent!!!!");
        }
    })

    

    
})





app.listen(port, () => {
    console.log(`The app is running at ${port}`)
})

