import TodoEntity from "../../domain/entities /todoEntity";

interface TodoInterface {
  getTodos(todo: any): Promise<any>;
  getTodoById(id: string): Promise<any>;
  addTodo(todo: TodoEntity): Promise<any>;
  updateTodo(todo: TodoEntity): Promise<any>;
  deleteTodo(todoId: any, userId: any) : Promise<any>;
}

export default TodoInterface;
