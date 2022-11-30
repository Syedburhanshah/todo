import { v4 as uuidv4 } from "uuid";
import  Todo from "../../Database/Model/todoModel"
import auth from "../middleware/auth"
import todoEntity from "../../domain/entities /todoEntity"


class TodoController {

 static getTodos = async (req:any, res:any) => {
    console.log(req.session)
    const todos = await Todo.findAll({
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
       const todo = await Todo.findOne({
         where: {
           todoId : req.params.id,
           userId : req.session.userId,
          
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

      const todo = await Todo.create({
        todoId : dtoTodo.todoId,
         name : dtoTodo.name,             
        description : dtoTodo.description,
        userId :dtoTodo.userId
       });
    
   // const todo = await Todo.create(dtoTodo)
    console.log(todo);
    
       const daoTodo =  todoEntity.createDao(todo)
      
 
       res.status(200).send(daoTodo);
     } catch (err) {
       console.log(err);
       res.status(500).send({ message: "Internal Server Error" });
     }
   };
 
   static updateTodo = async (req:any, res:any) => {
     try {
      const dtoTodo=  todoEntity.createDto(req.params.id, req.session.userId,req.body)
     //  console.log(req.params.id)
       const todo = await Todo.update(
         {
           name: dtoTodo.name,
           description: dtoTodo.description,
         },{
           where: {
             todoId: dtoTodo.todoId,
             userId : dtoTodo.userId,
           },
         });
       console.log(todo)
       const daoTodo =  todoEntity.createDao(todo)
      

 
       //console.log("...................................................................",daoTodo)
  
       if (todo[0]===0) {
        
         
         res.status(404).send({ message: "ID not exist" });
       } else {
        res.status(200).send({message:"update sucessfully"});
      
       }
     } catch (err) {
       console.log(err);
       res.status(500).send({ message: "Internal Server Error" });
     }
   };
 
   static deleteTodo = async (req:any, res:any) => {
     try {
       const todo = await Todo.destroy({
        
         where: {
           todoId: req.params.id,
           userId : req.session.userId,
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
  
 }
 export default  TodoController;