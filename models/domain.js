var mongoose = require('mongoose')

var domainSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  status:    { type: String, required: true },
  expires:    { type: Date, required: true },
  meta:   { type: mongoose.Schema.Types.Mixed },
  value:     { type: Number, default: 0 },

  created:  { type: Date, default: Date.now },
  __v:      { type: Number, select: false },
})

module.exports = mongoose.model('domain', domainSchema)