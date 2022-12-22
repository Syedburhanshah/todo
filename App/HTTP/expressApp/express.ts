import express from 'express';
import dotenv from'dotenv';
import todoRoutes from "../Router/todoRouter";
import userRoutes from "../Router/userRouter";
import authRoutes from "../Router/authRouter"
import session from 'express-session';

const app: any = express();
dotenv.config();

app.use(session({
    secret: "mysecret",
    saveUninitialized:false,
    resave: false 
  }));
app.use(express.json())
app.use('/todo',todoRoutes)
app.use('/user',userRoutes)
app.use("/auth", authRoutes)

export default app;