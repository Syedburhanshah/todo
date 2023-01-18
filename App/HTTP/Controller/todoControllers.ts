import todoService from "../../services/todoServices/todoService";

class TodoController {
  static getTodos = async (req: any, res: any) => {
    const todo: any = await todoService.getTodos(req);
    res.status(todo.statusCode).send(todo);
  };

  static getTodoById = async (req: any, res: any) => {
    const todo: any = await todoService.getTodoById(req);
    res.status(todo.statusCode).send(todo);
  };

  static addTodo = async (req: any, res: any) => {
    const todo: any = await todoService.addTodo(req);
    res.status(todo.statusCode).send(todo);
  };

  static updateTodo = async (req: any, res: any) => {
    const todo: any = await todoService.updateTodo(req);
    res.status(todo.statusCode).send(todo);
  };

  static deleteTodo = async (req: any, res: any) => {
    const todo: any = await todoService.deleteTodo(req);
    res.status(todo.statusCode).send(todo);
  };
}

export default TodoController;
