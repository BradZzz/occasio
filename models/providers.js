"use strict";

module.exports = function(sequelize, DataTypes) {
  var Provider = sequelize.define("vw_provider_index", {
    //ID
    dbid: { type: DataTypes.INTEGER, primaryKey: true },
    client_dbid: { type: DataTypes.INTEGER },
    provider_id: { type: DataTypes.STRING },
    npi: { type: DataTypes.INTEGER },
    tax_id: { type: DataTypes.INTEGER },
    //Provider Demographic
    full_name: { type: DataTypes.STRING, allowNull: false },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    specialty: { type: DataTypes.STRING },
    provider_type: { type: DataTypes.STRING },
    address_1: { type: DataTypes.STRING },
    address_2: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    zip: { type: DataTypes.INTEGER },
    phone: { type: DataTypes.STRING },
    fax: { type: DataTypes.STRING },
    //Provider Totals (Current Year)
      number_of_members: { type: DataTypes.INTEGER },
      pcp_assigned_members: { type: DataTypes.INTEGER },
      non_pcp_assigned_members: { type: DataTypes.INTEGER },
      opportunity_score: { type: DataTypes.FLOAT },
      current_num_eligible_members: { type: DataTypes.INTEGER },
      //Compiled Metrics
      current_recapture_rate: { type: DataTypes.INTEGER },
      current_avg_hcc_captured: { type: DataTypes.FLOAT },
      current_avg_hcc_unaccpt: { type: DataTypes.FLOAT },
      current_avg_hcc_suspects_clin: { type: DataTypes.FLOAT },
      current_avg_hcc_suspects_yoy: { type: DataTypes.FLOAT },
      current_avg_opportunity: { type: DataTypes.FLOAT },
      current_avg_raf_captured: { type: DataTypes.FLOAT },
      current_avg_raf_demo: { type: DataTypes.FLOAT },
      current_avg_raf_projected: { type: DataTypes.FLOAT },
    //Provider Totals (Last Year)
      prior_num_eligible_members: { type: DataTypes.INTEGER },
      //Compiled Metrics
      prior_recapture_rate: { type: DataTypes.INTEGER },
      prior_avg_hcc_captured: { type: DataTypes.FLOAT },
      prior_avg_hcc_unaccpt: { type: DataTypes.FLOAT },
      prior_avg_hcc_suspects_clin: { type: DataTypes.FLOAT },
      prior_avg_hcc_suspects_yoy: { type: DataTypes.FLOAT },
      prior_avg_opportunity: { type: DataTypes.FLOAT },
      prior_avg_raf_captured: { type: DataTypes.FLOAT },
      prior_avg_raf_demo: { type: DataTypes.FLOAT },
      prior_avg_raf_projected: { type: DataTypes.FLOAT },
    //Provider Totals (2 Years Ago)
      prior2_num_eligible_members: { type: DataTypes.INTEGER },
      //Compiled Metrics
      prior2_recapture_rate: { type: DataTypes.INTEGER },
      prior2_avg_hcc_captured: { type: DataTypes.FLOAT },
      prior2_avg_hcc_unaccpt: { type: DataTypes.FLOAT },
      prior2_avg_hcc_suspects_clin: { type: DataTypes.FLOAT },
      prior2_avg_hcc_suspects_yoy: { type: DataTypes.FLOAT },
      prior2_avg_opportunity: { type: DataTypes.FLOAT },
      prior2_avg_raf_captured: { type: DataTypes.FLOAT },
      prior2_avg_raf_demo: { type: DataTypes.FLOAT },
      prior2_avg_raf_projected: { type: DataTypes.FLOAT },
  }, {
    schema: 'stage',
    timestamps: false,
    freezeTableName: true,
  })

  return Provider;
}