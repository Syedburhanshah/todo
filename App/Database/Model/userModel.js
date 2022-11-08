const Sequelize = require('sequelize')
const sequelize = require('../Connection/DatabaseConnection')

const user = sequelize.define('User',{
    id : {
        type : Sequelize.CHAR,
        allowNull: false,
        primaryKey: true,
    },
    name : {
        type : Sequelize.STRING,
        allowNull: false
    },
    email : {
        type : Sequelize.STRING,
        allowNull: false,
        unique : true
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    }
});



module.exports = user;