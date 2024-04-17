import jwt from 'jsonwebtoken';
import {createError} from '../utils/error.js'


//verify token
export const verifyToken = (req, res, next) => {
    //access token from cookies
    const token = req.cookies.access_token;
    if(!token) {
        return next(createError(401, 'Youre not authenticated'))
    }

    //if there's token does not mean it's correct
    jwt.verify(token,process.env.JWT, (err, user) => {
        if(err) return next(createError(403, 'Token is invalid'))
        req.user = user;
        next()
    }) 
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
        if(err) return next(createError(403, 'You are not authorized'))
            
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.isAdmin) {
            next()
        } else {
        if(err) return next(createError(403, 'You are not authorized'))
            
        }
    })
}