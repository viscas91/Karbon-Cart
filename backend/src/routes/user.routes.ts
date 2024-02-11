import express from 'express';
import { createStaff } from '../controllers/users/createStaff';


const router = express.Router();

router.get('/create/staff', createStaff)

export { router as UserRouter };