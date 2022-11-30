import dotenv from'dotenv';
dotenv.config();

const dbConfig :any =  {
    HOST: process.env.DBHOST,
    USER: process.env.DBUSER,
    PASSWORD: process.env.DBPASSWORD,
    DB: process.env.DBNAME,
    DIALECT: process.env.DBDIALECT,  
  };
  export default dbConfig;