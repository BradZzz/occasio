"use strict";

module.exports = function(sequelize, DataTypes) {
  var Provider = sequelize.define("vw_provider_index", {
    dbid: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    provider_id: {
      type: DataTypes.INTEGER,
    },
    npi: {
      type: DataTypes.INTEGER,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provider_type: {
      type: DataTypes.STRING,
    },
    address_1: {
      type: DataTypes.STRING,
    },
    address_2: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    zip: {
      type: DataTypes.INTEGER,
    },
  }, {
    schema: 'stage',
    timestamps: false,
    freezeTableName: true,
  })

  return Provider;
}