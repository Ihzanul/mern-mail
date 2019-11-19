const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = 4000
const mailRouters = express.Router()

let MailNumbers = require('./mailnumbersModel')

app.use(cors())
app.use(bodyParser.json())
app.use('/', mailRouters)

mongoose.connect('mongodb://127.0.0.1:27017/mailnumbers', { useNewUrlParser: true })
const connection = mongoose.connection

connection.once('open', function() {
  console.log('MongoDB connection successfully')
})

app.listen(PORT, function() {
  console.log('Server running on port '+PORT)
})

mailRouters.route('/').post(function(req, res) {
  let mails = new MailNumbers(req.body)
  mails.save()
    .then(todo => {
      res.status(200).json({'mail': 'mail added successfully'})
    })
    .catch(err => {
      res.status(400).send('failed adding mail')
    })
})

mailRouters.route('/list').get(function(req, res) {
  MailNumbers.find(function(err, mails) {
    if (err) {
      console.log(err)
    } else {
      res.json(mails)
    }
  })
})

mailRouters.route('/edit/:id').get((req, res) => {
  MailNumbers.findById(req.params.id)
  .then(todo => {
    res.status(200).json(todo);
  })
  .catch(err => {
    res.status(400).send('failed get mail')
  })
})

mailRouters.route('/delete/:id').post((req, res) => {
  // console.log(req.body)
  MailNumbers.findByIdAndDelete(req.body._id)
  .then(() => {
    res.status(200).json('Mail deleted')
  })
  .catch(err => {
    res.status(400).send('Failed delete mail')
  })
})

mailRouters.route('/update/:id').post(function(req, res) {
  const {
    number,
    name,
    nim,
    semester,
    sign
  } = req.body;

  // console.log(req.body)

  MailNumbers.updateOne({ 'number': number } , {$set: {name, nim, semester, sign}})
    .then(todo => {
      res.status(200).json({'mail': 'mail edit successfully'})
    })
    .catch(err => {
      res.status(400).send('failed adding mail')
    })
})

// get last index
mailRouters.route('/getLast').get(function(req, res) {
  MailNumbers.find(function(err, mails) {
    if (err) {
      console.log(err)
    } else {
      res.json(mails[0].number)
    }
  }).sort({'number': -1}).limit(1)
})
