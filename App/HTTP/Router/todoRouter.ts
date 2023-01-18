import express from "express";
const router = express.Router();
import todoController from "../Controller/todoControllers";
import auth from "../middleware/auth";

router.get("/", auth, todoController.getTodos);
router.get("/:id", auth, todoController.getTodoById);
router.delete("/:id", auth, todoController.deleteTodo);
router.put("/:id", auth, todoController.updateTodo);
router.post("/", auth, todoController.addTodo);

export default router;
