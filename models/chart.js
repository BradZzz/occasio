"use strict";

module.exports = function(sequelize, DataTypes) {
  var Chart = sequelize.define("member_charts", {
    //ID
    dbid: { type: DataTypes.INTEGER, primaryKey: true },
    member_dbid: { type: DataTypes.INTEGER },
    project_key: { type: DataTypes.STRING },
    file_name: { type: DataTypes.STRING },
    retrieval_date: { type: DataTypes.DATE },
    hicn: { type: DataTypes.STRING },
    chart_id: { type: DataTypes.STRING },
    sfdc_client_key: { type: DataTypes.STRING },
    epi_chart_id: { type: DataTypes.STRING },
    provider_dbid: { type: DataTypes.INTEGER },
  }, {
    schema: 'stage',
    timestamps: false,
    freezeTableName: true,
  })
  return Chart;
}