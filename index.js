const bodyParser = require("body-parser");
const express = require("express");
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
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

const n = require("./nodemailer");

app.get("/", (req, res) => {
  res.send("🐱‍👤");
});
app.post("/", (req, res) => {
  const transporter = nodemailer.createTransport({
    //host: "smtp.gmail.com",
    //port: 465,
    service: "gmail",
    auth: {
      user: "andr3wcarpentier@gmail.com",
      pass: "lmebtehgfblqhvxb",
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  const handlebarOptions = {
    viewEngine:  {
      partialsDir:  path.resolve('./views/'),
      defaultLayout:  false
    },
    viewPath:  path.resolve('./views/'),
  };

  transporter.use('compile', hbs(handlebarOptions));

  const mailOptions = {
    from: "andr3wcarpentier@gmail.com",
    to: "andr3wcarpentier@gmail.com",
    subject: "Sending Email using Node.js",
    template: "email",
  
    context: {
      name: "Andrew",
      token : "jikqdjsqi"
    }
  };

  

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.send(JSON.stringify(true));
});

// Lancement du serveur Node.js
app.listen(port, () => {
  console.log(`Serveur Node.js écoutant sur le port ${port}`);
});
