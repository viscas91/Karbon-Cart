import express from 'express';
import { registerUser } from '../controllers/auth/registerController';
import verifyUserEmail from '../controllers/auth/verifyEmailController';
import { loginUser } from '../controllers/auth/loginController';
import { logoutUser } from '../controllers/auth/logoutController';
import { newAccessToken } from '../controllers/auth/refreshTokenController';
import { checkAuth } from '../middlewares/isAuthenticated';

const router = express.Router();

router.post("/register", registerUser);
router.post('/login', loginUser);
router.get("/verify/:emailToken/:userId", verifyUserEmail);
router.get("/new_access_token", newAccessToken);
router.get('/logout', logoutUser);

export { router as authRouter };