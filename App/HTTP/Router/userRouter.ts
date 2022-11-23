import express from 'express'
import  userController from "../Controller/userController"
const router = express.Router()


router.get('/user',userController.getUsers);
router.post('/user/login',userController.logInUser);
router.post('/user/signup',userController.signUpUser);

export default router;