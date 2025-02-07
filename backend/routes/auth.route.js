import express from 'express';
import { login, signup } from '../controller/auth.controller.js';

const route = express.Router();

route.get('/signup',signup);
route.get('/login',login);


export default route;