const Sequelize = require("sequelize");

//Imports
const db = require("../utils/connect");
const task = require("./task");


const FileTask = db.define('file_task', {
    idfile_task: {type: Sequelize.SMALLINT, primaryKey: true},
    idtask: {type: Sequelize.SMALLINT},
    name: Sequelize.STRING,
    url: Sequelize.STRING,
    state: Sequelize.ENUM('Active', 'Inactive'),
    date_at: Sequelize.DATE,
    date_upd: Sequelize.DATE
  },{
    timestamps: false,
    freezeTableName: true,
  });

  task.hasMany(FileTask, { foreignKey: 'idtask' });
  FileTask.belongsTo(task, { foreignKey: 'idtask' });

  module.exports = FileTask;