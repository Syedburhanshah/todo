import express from 'express';
import dotenv from'dotenv';
import todoRoutes from "../Router/todoRouter";
import userRoutes from "../Router/userRouter";
import session from 'express-session';

const app: any = express();
dotenv.config();

app.use(session({
    secret: "mysecret",
    saveUninitialized:false,
    resave: false 
  }));
app.use(express.json())
app.use('/',todoRoutes)
app.use('/',userRoutes)

export default app;