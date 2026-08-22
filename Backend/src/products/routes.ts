import express from 'express'
import { getProducts , addProducts , editProducts ,deleteProduct} from './controllers.js';

const router = express.Router();

router.get('/get' , getProducts);
router.post('/add' , addProducts);
router.put('/edit/:id' , editProducts);
router.delete('/delete/:id' , deleteProduct);

export default router;