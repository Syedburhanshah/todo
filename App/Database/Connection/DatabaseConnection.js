const Sequelize = require('sequelize')

const sequelize = new Sequelize("tododb","root","asadAli@1122",
{
    host : "localhost",
    dialect : "mysql",
    port: 3306,
    logging:false
})

try {
  sequelize.sync();
 console.log('Connection has been established successfully.');
} catch (error) {
 console.error('Unable to connect to the database:', error);
}
    
  module.exports = sequelize


  

