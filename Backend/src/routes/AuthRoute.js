import express from 'express'
import {UserLogin,UserRegister} from '../controller/AuthController.js';


const authRouter=express.Router();
//UserRegister router
authRouter.post('/register',UserRegister);
//UserLogin router
authRouter.post('/login',UserLogin);

export default authRouter;