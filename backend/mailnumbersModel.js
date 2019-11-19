const mongoose = require('mongoose')
const Schema = mongoose.Schema

let MailNumbers = new Schema({
  number: {
    type: Number
  },
  name: {
    type: String
  },
  nim: {
    type: String
  },
  semester: {
    type: String
  },
  sign: {
    type: String
  }
})

module.exports = mongoose.model('MailNumbers', MailNumbers)