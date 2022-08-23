const Sequelize = require("sequelize");

const sequelizeDb = new Sequelize(
   'agexport',
   'root',
   '',
    {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 100000
        }
    }
  );

  module.exports = sequelizeDb;