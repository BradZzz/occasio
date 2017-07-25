"use strict";

module.exports = function(sequelize, DataTypes) {
  var DX = sequelize.define("member_dxcodes", {
    //ID
    dbid: { type: DataTypes.INTEGER, primaryKey: true },
    provider_dbid: { type: DataTypes.INTEGER },
    member_dbid: { type: DataTypes.INTEGER },
    //DX
    dxcode: { type: DataTypes.STRING },
    date_of_service: { type: DataTypes.STRING },
    hcc_code: { type: DataTypes.STRING },
    hcc_type: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    //Extra Info
    source: { type: DataTypes.STRING },
    pos: { type: DataTypes.STRING },
    is_deleted: { type: DataTypes.BOOLEAN },
    procedure_code: { type: DataTypes.STRING },
    dx_status: { type: DataTypes.STRING },
    is_chronic: { type: DataTypes.BOOLEAN },
    code_source: { type: DataTypes.STRING },
  }, {
    schema: 'stage',
    timestamps: false,
    freezeTableName: true,
  })
  return DX;
}