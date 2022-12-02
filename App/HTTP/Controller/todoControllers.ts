import { v4 as uuidv4 } from "uuid";
import auth from "../middleware/auth"
import todoEntity from "../../domain/entities /todoEntity"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



class TodoController {

 static getTodos = async (req:any, res:any) => {
    console.log(req.session)
    const todos = await prisma.todos.findMany({
      where: {
        userId : req.session.userId,
      },

    });
    const daotodo = await todos.map((value: any) => {
      return todoEntity.createDao(value);
      
    });

    
    res.status(200).send(daotodo);
  };

  static getTodoById = async (req:any, res:any) => {
    try {
      const todo = await prisma.todos.findUnique({
        where: {
          todoId : req.params.id,
          
        
        },
      });
      if (!todo) {
        res.status(404).send({ message: "ID not exist" });
      } else {
       const daoTodo = await todoEntity.createDao(todo)
    
         res.status(200).send(daoTodo);

      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };


  static addTodo = async (req:any, res:any) => {

    try {
     const dtoTodo=  todoEntity.createDto(uuidv4(), req.session.userId,req.body)

     const todo = await prisma.todos.create({
       data:{
         todoId : dtoTodo.todoId,
         name : dtoTodo.name,            
        description : dtoTodo.description,
        userId :dtoTodo.userId

       },
      
      });
  
  // const todo = await Todo.create(dtoTodo)
   console.log(todo);
  
      const daoTodo =  todoEntity.createDao(todo)
    

      res.status(200).send(daoTodo);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }

  static updateTodo = async (req:any, res:any) => {
    try {
     const dtoTodo=  todoEntity.createDto(req.params.id, req.session.userId,req.body)
    //  console.log(req.params.id)
      const todo = await prisma.todos.update(
        {
          where: {
            todoId: dtoTodo.todoId,
        
          },

         data:{
           name: dtoTodo.name,
           description: dtoTodo.description,

         }
        },
          
        );
      console.log(todo)
      if(!todo){
        res.status(500).send({ message: "not updated" })
      }else{

        res.status(200).send({ message: " Updated" })
      }
    


      //console.log("...................................................................",daoTodo)

    
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };

  static deleteTodo = async (req:any, res:any) => {
    try {
      const todo = await prisma.todos.delete({
      
        where: {
          todoId: req.params.id,
          
        },
      });
      if (!todo) {
        res.status(404).send({ message: "ID not exist" });
      } else {
        res.status(200).send({message : 'Deleted Successfully'});
        
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error" });
    }
  
  };


 
  };

 

 
   
  
 
 export default  TodoController;