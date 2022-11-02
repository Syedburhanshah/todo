const { where } = require("sequelize");
const uuid = require("uuid");
const Todo = require("../../App/Database/Model/todoModel")
const auth = require("../middleware/auth")


class TodoController {

  getTodos = async (req, res) => {
    console.log(req.session)
    const todos = await Todo.findAll({
      where: {
        userId : req.session.userId,
      },
    });
    res.status(200).send(todos);
  };
 
    getTodoById = async (req, res) => {
     try {
      console.log(req.session.userId,req.params.id,"MMMMMMMMMMMMMMMMMM")
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
  
 
    addTodo = async (req, res) => {

     try {
       const todo = await Todo.create({
        todoId : uuid.v4(),
        userId : req.session.userId,
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
 
    updateTodo = async (req, res) => {
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
 
    deleteTodo = async (req, res) => {
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
 module.exports = new TodoController;