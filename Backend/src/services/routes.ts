import express from 'express'
import { getServices , addServices , editServices , deleteServices} from './controllers.js';

const router = express.Router();

router.get('/get' , getServices);
router.post('/add' , addServices);
router.put('/edit/:id' , editServices);
router.delete('/delete/:id' , deleteServices);

export default router;