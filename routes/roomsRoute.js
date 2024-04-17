import express from 'express'
import roomController from '../controller/roomController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router()

router.post('/postroom/:hotelid', verifyAdmin, roomController.postRoom)
router.put('/updateroom/:id', verifyAdmin, roomController.updateRoom)
router.delete('/deleteroom/:id/:hotelid', verifyAdmin, roomController.deleteRoom)
router.get('/getoneroom/:id', roomController.getoneroom)
router.get('/getrooms', roomController.getRooms)


export default router;