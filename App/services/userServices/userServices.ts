import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import UserEntity from "../../domain/entities/userEntity";
import { PrismaClient } from "@prisma/client";
import UserInterface from "./userInterfaces";
import { statusCode, message } from "../errorHandling/errorMessage";

const prisma = new PrismaClient();

class UserServices implements UserInterface {
  async getUsers(): Promise<any> {
    const users = await prisma.users.findMany();
    const user = users.map((value: any) => {
      return UserEntity.createFromObject(value);
    });

    return { statusCode: statusCode.SUCCESS, message: user };
  }
  catch(err) {
    return {
      statusCode: statusCode.SERVER_ERROR,
      message: message.SERVER_ERROR,
    };
  }

  async logInUser(req: any): Promise<any> {
    try {
      const user: any = await prisma.users.findUnique({
        where: {
          email: req.body.email,
        },
      });

      if (user && user.password === req.body.password) {
        req.session.userId = user.id;
        return { statusCode: statusCode.SUCCESS, message: message.SUCCESS[3] };
      }
      if (!user) {
        return {
          statusCode: statusCode.UNAUTHORIZED,
          message: message.NOT_EMAIL,
        };
      } else {
        return {
          statusCode: statusCode.UNAUTHORIZED,
          message: message.INVALID,
        };
      }
    } catch (err) {
      return {
        statusCode: statusCode.SERVER_ERROR,
        message: message.SERVER_ERROR,
      };
    }
  }

  async signUpUser(req: any): Promise<any> {
    try {
      const oneUser = await prisma.users.findUnique({
        where: {
          email: req.body.email,
        },
      });
      if (oneUser) {
        return {
          statusCode: statusCode.SUCCESS,
          message: message.ALREADY_TAKEN,
        };
      } else {
        const hasedPassword = await bcrypt.hash(req.body.password, 11);
        console.log("hashed pass", hasedPassword);
        const dtoUser = UserEntity.createFromInput(uuidv4(), req.body);
        await prisma.users.create({
          data: dtoUser,
        });
        return {
          statusCode: statusCode.CREATED,
          message: message.SUCCESS[0],
        };
      }
    } catch (err) {
      return {
        statusCode: statusCode.SERVER_ERROR,
        message: message.SERVER_ERROR,
      };
    }
  }
}

export default new UserServices();
