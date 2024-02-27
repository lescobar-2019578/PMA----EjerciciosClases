'use strict'

import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'

export const validateJwt = async(req, res, next)=>{
    try {
        //Obtener la llave de acceso al token
        let secretKey = process.env.SECRET_KEY
        //obtener el token de los headers
        let { token } = req.headers
        //Verificar si tiene el token
        if(!token) return res.status(401).send({message: 'Unathorizable'})
        //Obtener el uid del usuario que envio el token
        let { uid } = jwt.verify(token, secretKey )
        //Validar si aun existe en DB
        let user = await User.findOne({_id: uid})
        if(!user) return res.status(404)({message: 'User not found - Unathorizable'})
        req.user = user
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({message: 'Invalid token'})
    }
}

export const isAdmin = async(req, res, next)=>{
    try {
        let { user } = req
        if(!user || user.role !== 'ADMIN') return res.status(403).send({message: `You dont have access |  username: ${user.username}`})
        next()
    } catch (err) {
        console.error(err)
        return response.status(403).send({message: 'Unauthorized role'})
    }
}
