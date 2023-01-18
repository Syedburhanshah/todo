import userServices from "../../services/userServices/userServices";

class UserController {
  static getUsers = async (req: any, res: any) => {
    const user: any = await userServices.getUsers();
    res.status(user.statusCode).send(user);
  };

  static logInUser = async (req: any, res: any) => {
    const user: any = await userServices.logInUser(req);
    res.status(user.statusCode).send(user);
  };

  static signUpUser = async (req: any, res: any) => {
    const user: any = await userServices.signUpUser(req);
    res.status(user.statusCode).send(user);
  };
}

export default  UserController;
