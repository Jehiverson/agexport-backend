const Sequelize = require("sequelize");
//Imports
const db = require("../utils/connect");

const Responsible = db.define('responsible', {
    idresponsible: {type: Sequelize.SMALLINT, primaryKey: true},
    name: Sequelize.STRING,
    position: Sequelize.STRING,
    state: Sequelize.ENUM('Active', 'Inactive'),
    date_at: Sequelize.DATE,
    date_upd: Sequelize.DATE,
  },{
    timestamps: false,
    freezeTableName: true,
  });

  module.exports = Responsible;