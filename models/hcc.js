"use strict";

module.exports = function(sequelize, DataTypes) {
  var HCC = sequelize.define("member_hccs", {
    //ID
    dbid: { type: DataTypes.INTEGER, primaryKey: true },
    member_dbid: { type: DataTypes.INTEGER },
    client_dbid: { type: DataTypes.INTEGER },
    member_id: { type: DataTypes.STRING },
    //HCC
    hcc_code: { type: DataTypes.STRING },
    interaction_hcc_code: { type: DataTypes.STRING },
    raf_captured: { type: DataTypes.FLOAT },
    raf_suspects: { type: DataTypes.FLOAT },
    suspect_type: { type: DataTypes.STRING },
    trumped_by: { type: DataTypes.STRING },
    is_trumped_by: { type: DataTypes.STRING },
    is_recap_opp: { type: DataTypes.INTEGER },
    is_recap: { type: DataTypes.INTEGER },
    hcc_status: { type: DataTypes.STRING },
    year: { type: DataTypes.INTEGER },
  }, {
    schema: 'stage',
    timestamps: false,
    freezeTableName: true,
  })
  return HCC;
}