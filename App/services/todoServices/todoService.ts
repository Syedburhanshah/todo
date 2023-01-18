import TodoInterface from "./todoInterfaces";
import { statusCode, message } from "../errorHandling/errorMessage";
import { v4 as uuidv4 } from "uuid";
import auth from "../../HTTP/middleware/auth";
import todoEntity from "../../domain/entities /todoEntity";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TodoServices implements TodoInterface {
  async getTodos(req: any): Promise<any> {
    try {
      console.log(req.query);
      
      const todos = await prisma.todos.findMany({
        skip: parseInt(req.query.page) * parseInt(req.query.size),
        take: parseInt(req.query.size),
        where: {
          userId: req.session.userId,
        },
      });
      console.log(todos,"!!!!!!!!1");
      
      const daotodo = await todos.map((value: any) => {
        return todoEntity.createDao(value);
      });
      return { statusCode: statusCode.SUCCESS, message: daotodo };
    } catch (err) {
      console.log(err);
      return {
        statusCode: statusCode.SERVER_ERROR,
        message: message.SERVER_ERROR,
      };
    }
  }

  async getTodoById(req: any): Promise<any> {
    try {
      const todoId: string = req.params.id;
      const todo = await prisma.todos.findUnique({
        where: {
          todoId: todoId,
        },
      });

      if (!todo) {
        return { statusCode: statusCode.NOT_FOUND, message: message.NOT_FOUND };
      } else
        return {
          statusCode: statusCode.SUCCESS,
          message: todoEntity.createDao(todo),
        };
    } catch (err) {
      console.log(err);
      return {
        statusCode: statusCode.SERVER_ERROR,
        message: message.SERVER_ERROR,
      };
    }
  }

  async addTodo(req: any): Promise<any> {
    try {
      const dtoTodo = todoEntity.createDto(
        uuidv4(),
        req.session.userId,
        req.body
      );

      const todo = await prisma.todos.create({
        data: dtoTodo,
      });

      return { statusCode: statusCode.CREATED, message: message.SUCCESS[0] };
    } catch (err) {
      console.log(err);
      return {
        statusCode: statusCode.SERVER_ERROR,
        message: message.SERVER_ERROR,
      };
    }
  }

  async updateTodo(req: any): Promise<any> {
    try {
      const dtoTodo = todoEntity.createDto(
        req.params.id,
        req.session.userId,
        req.body
      );

      const todo = await prisma.todos.update({
        where: {
          todoId: dtoTodo.todoId,
        },

        data: {
          name: dtoTodo.name,
          description: dtoTodo.description,
        },
      });

      if (!todo) {
        return { statusCode: statusCode.NOT_FOUND, message: message.NOT_FOUND };
      } else
        return { statusCode: statusCode.SUCCESS, message: message.SUCCESS[2] };
    } catch (err) {
      console.log(err);
      return {
        statusCode: statusCode.SERVER_ERROR,
        message: message.SERVER_ERROR,
      };
    }
  }

  async deleteTodo(req: any): Promise<any> {
    try {
      const todo = await prisma.todos.delete({
        where: {
          todoId: req.params.id,
        },
      });

      if (!todo) {
        return { statusCode: statusCode.NOT_FOUND, message: message.NOT_FOUND };
      } else
        return { statusCode: statusCode.SUCCESS, message: message.SUCCESS[1] };
    } catch (err) {
      console.log(err);
      return {
        statusCode: statusCode.SERVER_ERROR,
        message: message.SERVER_ERROR,
      };
    }
  }
}

export default new TodoServices();
