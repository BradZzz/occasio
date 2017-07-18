"use strict";

module.exports = function(sequelize, DataTypes) {
  var Member = sequelize.define("vw_provider_members", {
    client_dbid: { type: DataTypes.INTEGER },

    full_name: { type: DataTypes.STRING, allowNull: false },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING },
    date_of_birth: { type: DataTypes.DATE },

    provider_dbid: { type: DataTypes.INTEGER, primaryKey: true },
    pcp_name: { type: DataTypes.STRING },
    hicn: { type: DataTypes.STRING },
    health_plan_name: { type: DataTypes.STRING },
    health_plan_member_id: { type: DataTypes.STRING },
    last_encounter: { type: DataTypes.DATE },
    pcp_last_encounter: { type: DataTypes.DATE },
    current_is_eligible: { type: DataTypes.BOOLEAN },

    current_opportunity: { type: DataTypes.FLOAT },
    current_raf_captured: { type: DataTypes.FLOAT },
    current_raf_projected: { type: DataTypes.FLOAT },
    prior_opportunity: { type: DataTypes.FLOAT },
    prior_raf_captured: { type: DataTypes.FLOAT },
    prior_raf_projected: { type: DataTypes.FLOAT },
    },
    {
      schema: 'stage',
      timestamps: false
    }
  )

  return Member;
}