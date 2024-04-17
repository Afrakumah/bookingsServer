import User from "../models/userModel.js";
import {createError} from '../utils/error.js'

// export const postUser = async(req, res) => {
//     const newUser = new User(req.body)
//     try {
//         const savedUser = await newUser.save()
//     res.status(200).json(savedUser);
//     } catch (err) {
//     next(err);
//     }
// }

export const updateUser = async(req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, {$set: req.body}, {new: true}
        );

        if (updatedUser) {
            res.status(200).json(updatedUser)
        }
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async(req, res, next) => {
    try {
       const deletedUser = await User.findByIdAndDelete(req.params.id) 

       if(deletedUser) {
        res.status(200).json('user deleted successfully')
       }
    } catch (err) {
       next(err) 
    }
}

export const getOneUser = async(req, res, next) => {
    try {
        const getUser = await User.findById(req.params.id)

        res.status(200).json(getUser)
    } catch (err) {
        next(err)
    }
}

export const getUsers = async(req, res, next) => {
    try {
        const getAll = await User.find()

        if(getAll) {
            res.status(200).json(getAll)
        }
    } catch (err) {
        next(err)
    }
}


export default {
    // postUser,
    updateUser,
    deleteUser,
    getOneUser,
    getUsers
}