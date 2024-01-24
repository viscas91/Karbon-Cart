// import express from 'express';
// // import { userController } from '../controllers/userController';
// import { body } from 'express-validator';
// import { db } from '../config/db.config';
// import { validateRequest } from '../middlewares/validateRequest';
// import { BadRequestError } from '../utils/errors/badRequest';

// const router = express.Router()

// // router.get('/create', userController.getCreateForm);
// // router.post('/create',
// //     [
// //         body('email').isEmail().withMessage('Enter a valid email.').custom(async (value) => {
// //             const existingUser = await db('users').where('email', value).first();
// //             if (existingUser) {
// //                 throw new BadRequestError('User with this email already exists');
// //             }
// //             return true;
// //         }),
// //         body('username').custom(async (value) => {
// //             const existingUser = await db('users').where('username', value).first();
// //             if (existingUser) {
// //                 throw new BadRequestError('User with this username already exists');
// //             }
// //             return true;
// //         }),
// //         body('password1')
// //             .trim()
// //             .isLength({ min: 8, max: 30 })
// //             .withMessage('Password must be between 8 and 30 characters.')
// //             .custom((value, { req }) => {
// //                 if (value !== req.body.password2) {
// //                     throw new BadRequestError('Passwords do not match');
// //                 }
// //                 return true;
// //             }),
// //     ],
// //     validateRequest,
// //     userController.createUser);

// // router.get('/login', userController.getLoginForm);
// // router.post('/login', userController.login);
// // router.get('/logout', userController.logout);


// export { router as UserRouter };