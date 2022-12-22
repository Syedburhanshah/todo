import express from 'express'
import  authController from "../Controller/authController"
const router = express.Router()


router.get('/',authController.login);
router.get("/test", authController.test)
router.get("/Token",authController.getAccessTokenFromCode)



export default router;