class TodoEntity {

    todoId: string;
    userId : string;
    name: string;
    description: string;
    
  
    constructor(todoId:string,userId:string,name:string, description:string) {
      this.todoId = todoId;
      this.userId = userId;
      this.name = name;
      this.description = description;
    }
    static createDto = (todoId:string,userId:string,body:any) => {
      return new TodoEntity(
          todoId, 
          userId, 
          body.name, 
          body.description        
      );
    };
    static createDao = (todoObj:any) => {
      return new TodoEntity(
        todoObj.todoId,
        todoObj.userId,
        todoObj.name,
        todoObj.description,
      );
    };
  }
  export default TodoEntity;