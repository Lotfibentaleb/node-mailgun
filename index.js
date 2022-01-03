var express = require('express')
var nodemailer = require('nodemailer');
require('dotenv').config()
var app = express()
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/email', function (req, res) {
  console.log("1111111111111")
  console.log(JSON.stringify(req.body.email))
  console.log("1111111111111")
  
  console.log(process.env.AUTH_MAIL)
  console.log(process.env.AUTH_MAIL_PASSWORD)

  var transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.AUTH_MAIL,
      pass: process.env.AUTH_MAIL_PASSWORD
    }
  });
  var mailOptions = {
    from: req.body.email,
    to: process.env.TO_MAIL_ADRESS,
    subject: req.body.subject + ' (through portfolio site <from ' + req.body.email + '>)',
    text: req.body.content
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
  res.send('success');

})

app.listen(3001, function () {
  console.log('Listening on port 3001...')
})
