"use strict";

module.exports = function(sequelize, DataTypes) {
  var Provider = sequelize.define("vw_provider_index", {
    dbid: { type: DataTypes.INTEGER, primaryKey: true },
    client_dbid: { type: DataTypes.INTEGER },

    provider_id: { type: DataTypes.STRING },
    npi: { type: DataTypes.INTEGER },
    full_name: { type: DataTypes.STRING, allowNull: false },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    provider_type: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    fax: { type: DataTypes.STRING },
    address_1: { type: DataTypes.STRING },
    address_2: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    zip: { type: DataTypes.INTEGER },

    current_num_eligible_members: { type: DataTypes.INTEGER },

    current_avg_raf_captured: { type: DataTypes.FLOAT },
    current_avg_opportunity: { type: DataTypes.FLOAT },
    current_recapture_rate: { type: DataTypes.FLOAT },

    prior_avg_raf_captured: { type: DataTypes.FLOAT },
    prior_avg_opportunity: { type: DataTypes.FLOAT },
    prior_recapture_rate: { type: DataTypes.FLOAT },

    opportunity_score: { type: DataTypes.FLOAT },
  }, {
    schema: 'stage',
    timestamps: false,
    freezeTableName: true,
  })

  return Provider;
}