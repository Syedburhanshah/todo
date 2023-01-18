import UserEntity from "../../domain/entities /userEntity";

interface UserInterface {
  getUsers(): Promise<any>;
  logInUser(email: string): Promise<any>;
  signUpUser(user: UserEntity): Promise<any>;
}

export default UserInterface;
