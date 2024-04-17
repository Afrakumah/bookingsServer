import express from 'express';
import userController from '../controller/userController.js';
import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js';


const router = express.Router();

//router.post('/postuser', userController.postUser)
// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//     //when u open this route it'll go to verifyToken.js and if all is ok, it'll execute next() below

//     res.send('Hi user, you are successfully logged in')
// })

// //if user wants to update or delete account
// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.send('Hi user, you are logged in and you can delete account')
// })


// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//     res.send('Hi admin, you are logged in and you can delete all accounts')
// })



//adding verification middleware to delete
router.put('/updateuser/:id',verifyUser, userController.updateUser)
router.delete('/deleteuser/:id', verifyUser, userController.deleteUser)
router.get('/getoneuser/:id', verifyUser, userController.getOneUser)
router.get('/getusers', verifyAdmin, userController.getUsers)


export default router;