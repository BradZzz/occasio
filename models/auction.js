//var mongoose = require('mongoose')
//
//var auctionSchema = new mongoose.Schema({
//  usrID:    { type: String, required: true },
//  name:     { type: String, required: true },
//  image:    { type: String },
//  message:  { type: String },
//  minimum:  { type: Number, default: 45 },
//  start:    { type: Date, required: true },
//  expires:  { type: Date, required: true },
//  created:  { type: Date, default: Date.now },
//  __v:      { type: Number, select: false },
//})
//
//module.exports = mongoose.model('auction', auctionSchema)