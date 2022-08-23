const Sequelize = require("sequelize");
 
//Imports
const db = require("../utils/connect");
const responsible = require("./responsible");

const Task = db.define('task', {
    idtask: {type: Sequelize.SMALLINT, primaryKey: true},
    IdResponsible: {type: Sequelize.SMALLINT},
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    status: Sequelize.ENUM('Active', 'Inactive'),
    priority: Sequelize.ENUM('High', 'Medium', 'Low'),
    date_at: Sequelize.DATE,
    date_end: Sequelize.DATE,
  },{
    timestamps: false,
    freezeTableName: true,
  });
 
  responsible.hasMany(Task, { foreignKey: 'IdResponsible' });
  Task.belongsTo(responsible, { foreignKey: 'IdResponsible' });

  module.exports = Task;