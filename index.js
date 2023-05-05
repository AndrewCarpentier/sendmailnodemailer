const bodyParser = require("body-parser");
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const http = require("http");
const server = http.createServer(app);

const cors = require("cors");
const port = 8000;

// Middleware pour gérer les requêtes JSON
app.use(bodyParser.json());

// Middleware pour éviter les problèmes de CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const n = require('./nodemailer');

app.get('/', (req,res)=>{
    res.send('🐱‍👤')
})
app.post("/", (req, res) => {
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   secure: true,
  //   auth: {
  //     user: "andr3wcarpentier@gmail.com",
  //     pass: "lmebtehgfblqhvxb",
  //   },
  // });

  // const mailOptions = {
  //   from: "andr3wcarpentier@gmail.com",
  //   to: "andr3wcarpentier@gmail.com",
  //   subject: "sending mail using nodejs",
  //   text: "that  was easy",
  // };

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("email sent: " + info.response);
  //   }
  // });
  
  try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "andr3wcarpentier@gmail.com",
                pass: "lmebtehgfblqhvxb",
            },
        });
        const mailOptions = {
            from: "andr3wcarpentier@gmail.com",
            to: "imkxso@gmail.com",
            subject: "Sending Email using Node.js",
            text: "it was easy"
        };
        
        let info = transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        console.log("Message sent: %s", info);
        res.send(JSON.stringify(info));
  } catch (error) {
    console.error(error);
  }
});

// Lancement du serveur Node.js
app.listen(port, () => {
  console.log(`Serveur Node.js écoutant sur le port ${port}`);
});
