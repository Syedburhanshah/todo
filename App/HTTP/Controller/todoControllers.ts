import { v4 as uuidv4 } from "uuid";
import  Todo from "../../Database/Model/todoModel"
import auth from "../middleware/auth"


class TodoController {

  getTodos = async (req:any, res:any) => {
    console.log(req.session)
    const todos = await Todo.findAll({
      where: {
        userId : req.session.userId,
      },
    });
    res.status(200).send(todos);
  };
 
    getTodoById = async (req:any, res:any) => {
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
         res.status(200).send(todo);
       }
     } catch (err) {
       console.log(err);
       res.status(500).send({ message: "Internal Server Error" });
     }
   };
  
 
    addTodo = async (req:any, res:any) => {

     try {
       const todo = await Todo.create({
        todoId :  uuidv4(),
         name : req.body.name,
         description : req.body.description,
         userId :req.session.userId
       });
      
 
       res.status(200).send(todo);
     } catch (err) {
       console.log(err);
       res.status(500).send({ message: "Internal Server Error" });
     }
   };
 
    updateTodo = async (req:any, res:any) => {
     try {
       console.log(req.params.id)
       const todo = await Todo.update(
         {
           name: req.body.name,
           description: req.body.description,
         },{
           where: {
             todoId: req.params.id,
             userId : req.session.userId,
           },
         });
       console.log(todo)
       if (!todo) {
         res.status(404).send({ message: "ID not exist" });
       } else {
         res.status(200).send({message : 'Updated Successfully'});
       }
     } catch (err) {
       console.log(err);
       res.status(500).send({ message: "Internal Server Error" });
     }
   };
 
    deleteTodo = async (req:any, res:any) => {
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
 export default  new TodoController;