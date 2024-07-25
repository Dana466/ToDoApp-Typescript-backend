import { Router } from "express";
import {signup,login} from '../controllers/usercontroller'

const userrouter :Router=Router()

userrouter.post('/user/signup',signup)
userrouter.post('/user/login',login)

export default userrouter;
