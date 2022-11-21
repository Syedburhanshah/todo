require('dotenv').config()

const dbConfig =  {
    HOST: process.env.DBHOST,
    USER: process.env.DBUSER,
    PASSWORD: process.env.DBPASSWORD,
    DB: process.env.DBNAME,
    DIALECT: process.env.DBDIALECT,  
  };
  module.exports =dbConfig;