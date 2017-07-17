"use strict"

require('dotenv').config()

const fs        = require('fs')
const path      = require('path')
const Sequelize = require('sequelize')
const env       = process.env.NODE_ENV || "development"
const sequelize = new Sequelize(process.env.POSTGRES_URL_DEV, {})

const db = {}

fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js")
  }).forEach(function(file) {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db