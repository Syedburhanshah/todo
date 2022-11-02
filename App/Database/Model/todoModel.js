const Sequelize = require('sequelize')
const sequelize = require("../Connection/DatabaseConnection")

const todo = sequelize.define('Todo',{
    todoId : {
        type : Sequelize.CHAR,
        allowNull: false,
        primaryKey: true
    },
    name : {
        type : Sequelize.STRING,
        allowNull: false
    },
    description : {
        type : Sequelize.STRING,
        allowNull: false
    },
    userId : {
        type : Sequelize.CHAR,
        allowNull: false
    },
    
})


module.exports = todo;