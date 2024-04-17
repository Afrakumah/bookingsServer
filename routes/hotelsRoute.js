import express from 'express'
import hotelController from '../controller/hotelController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router()

router.post('/posthotel', verifyAdmin, hotelController.postHotel)
router.put('/updatehotel/:id', verifyAdmin, hotelController.updateHotel)
router.delete('/deletehotel/find/:id', verifyAdmin, hotelController.deletehotel)
router.get('/gethotel/find/:id', hotelController.onehotel)
router.get('/allhotels', hotelController.gethotels)

router.get('/countbycity', hotelController.countByCity)
router.get('/countbytype', hotelController.countByType)
// localhost:4000/api/hotels/countbycity?cities=kumasi,kumasi,accra

export default router;