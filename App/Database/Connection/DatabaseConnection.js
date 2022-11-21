const Sequelize = require('sequelize')
const db =require( './config');

const sequelize = new Sequelize(db.DB, db.USER, db.PASSWORD, {
  dialect: db.DIALECT,
  host: db.HOST,
    logging:false
})

try {
  sequelize.sync();
 console.log('Connection has been established successfully.');
} catch (error) {
 console.error('Unable to connect to the database:', error);
}
    
  module.exports = sequelize


  

