"use strict";

module.exports = function(sequelize, DataTypes) {
  var Campaigns = sequelize.define("campaigns", {
    dbid: { type: DataTypes.INTEGER, primaryKey: true },
    client_dbid: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING },
    campaign_type: { type: DataTypes.STRING },
    which_codes: { type: DataTypes.STRING },
    code_types: { type: DataTypes.STRING },
    internal_source: { type: DataTypes.STRING },
    delivery_method: { type: DataTypes.STRING },

    conditions_string: { type: DataTypes.STRING },
    member_select: { type: DataTypes.STRING },

    is_deleted: { type: DataTypes.BOOLEAN },
    is_archived: { type: DataTypes.BOOLEAN },
    launched: { type: DataTypes.BOOLEAN },
    ended: { type: DataTypes.BOOLEAN },

    num_members_inception: { type: DataTypes.INTEGER },
    current_member_count: { type: DataTypes.INTEGER },

    avg_hcc_inception: { type: DataTypes.FLOAT },
    current_avg_hcc: { type: DataTypes.FLOAT },

    avg_raf_inception: { type: DataTypes.FLOAT },
    current_avg_raf: { type: DataTypes.FLOAT },

    avg_opp_inception: { type: DataTypes.FLOAT },
    current_opp: { type: DataTypes.FLOAT },

    num_yoy_inception: { type: DataTypes.INTEGER },
    current_yoy_count: { type: DataTypes.INTEGER },

    recap_rate_inception: { type: DataTypes.FLOAT },
    current_recap: { type: DataTypes.FLOAT },

    num_providers_inception: { type: DataTypes.INTEGER },
    current_providers_count: { type: DataTypes.INTEGER },

    start_date: { type: DataTypes.DATE },
    end_date: { type: DataTypes.DATE },
  }, {
    schema: 'stage',
    timestamps: false,
    freezeTableName: true,
  })

  return Campaigns;
}