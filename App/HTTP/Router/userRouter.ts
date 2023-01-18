import express from "express";
import userController from "../Controller/userController";
const router = express.Router();

router.get("/", userController.getUsers);
router.post("/login", userController.logInUser);
router.post("/signup", userController.signUpUser);

export default router;
