import { v4 as uuidv4 } from "uuid";
import  User from "../../Database/Model/userModel";
import bcrypt from "bcrypt";


class UserController {
   getUsers = async (req:any, res:any) => {
    console.log("type of get user is..............",typeof this.getUsers)
    const users = await User.findAll();
    res.status(200).send(users);
  };

   logInUser = async (req:any, res:any) => {
    try {
      const user:any = await User.findOne({
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
        console.log("type of login is ..............",typeof req, typeof res);
        
      } else {
        res.status(404).send({ message: "Invalid email or password" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

   signUpUser = async (req:any, res:any) => {
    try {
        const oneUser = await User.findOne({
          where: {
            email: req.body.email,
          },
        });
        console.log("oneUser",oneUser);
        if (oneUser) {
          res.send({ message: "Email already taken" });
        } else {
          const hasedPassword = await bcrypt.hash(req.body.password,11)
          console.log("hashed pass",hasedPassword);
          await User.create({
            id: uuidv4(),
            name: req.body.name,
            email: req.body.email,
            password:hasedPassword,
          });
        
          res.status(200).send({ message: "Added Successfully" });
        }
      
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
}

export default new UserController;