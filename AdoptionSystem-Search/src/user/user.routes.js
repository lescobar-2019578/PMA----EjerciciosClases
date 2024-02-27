import express from 'express'
import { 
    validateJwt,
    isAdmin
} from '../middlewares/validateJwt.js';
import { test, register, login, update, deleteU } from './user.controller.js';

const api = express.Router();
                       
//RUTAS PUBLICAS
api.post('/register', register)
api.post('/login', login)

//RUTAS PRIVADAS (Solo usuarios logeados)
                 //middleware
api.get('/test', [validateJwt, isAdmin], test)
api.put('/update/:id', [validateJwt],update)//Middlaware  -> funciones intermedios que sirven para validar 
api.delete('/delete/:id', [validateJwt], deleteU)

export default api