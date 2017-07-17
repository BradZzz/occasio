"use strict";

module.exports = function(sequelize, DataTypes) {
  var Member = sequelize.define("vw_provider_members", {
    provider_dbid: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pcp_name: { type: DataTypes.STRING },
  }, {
    schema: 'stage',
    timestamps: false
  })

  return Member;
}