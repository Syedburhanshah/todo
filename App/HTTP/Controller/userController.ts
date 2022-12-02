import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import UserEntity from "../../domain/entities /userEntity";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



class UserController {
  static getUsers = async (req:any, res:any) => {

    const users = await prisma.users.findMany();
    const user = users.map((value: any) => {
      return UserEntity.createFromObject(value);
    });

    res.status(200).send(user);
    console.log("...............................................",user)
  };
  static logInUser = async (req:any, res:any) => {
    try {
      const user:any = await prisma.users.findUnique({
        where: {
          email: req.body.email,
         
        },
       
      });
 
      if(!user){
         res.status(404).send({message : 'Email not exist'})
      }
      const comparePassword = await bcrypt.compare(req.body.password,user.password)
      if (user && comparePassword) {
        console.log("compared passs", comparePassword);
        req.session.userId = user.id;
        //console.log(user);
   
        res.status(200).send({ message: "log in successfully" });
       
       
      } else {
        res.status(404).send({ message: "Invalid email or password" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
 
 static  signUpUser = async (req:any, res:any) => {
    try {
        const oneUser = await prisma.users.findUnique({
          where: {
            email: req.body.email,
          },
        });
        console.log("oneUser...................................",oneUser);
        if (oneUser) {
          res.send({ message: "Email already taken" });
        } else {
          const hasedPassword = await bcrypt.hash(req.body.password,11)
          console.log("hashed pass",hasedPassword);
          const dtoUser = UserEntity.createFromInput(uuidv4(), req.body);
        const signupUser = await  prisma.users.create({
          data:{
 
            id: dtoUser.id,
            name: dtoUser.name,
            email: dtoUser.email,
            password:hasedPassword,
          }
          });
         
          const daoUser = UserEntity.createFromObject(signupUser)
          res.status(200).send(daoUser);
          console.log("...................................................",daoUser)
        }
       
      } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  
 
  
}

export default  UserController;