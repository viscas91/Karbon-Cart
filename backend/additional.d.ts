import { Request } from 'express';
// declare global {
//     namespace NodeJS {
//         interface ProcessEnv {
//             JWT_ACCESS_SECRET_KEY: string;
//             JWT_REFRESH_SECRET_KEY: string;
//             NODE_ENV: string;
//             DOMAIN: string;
//             SENDER_EMAIL: string;
//             MAILGUN_API_KEY: string;
//         }
//     }

//     namespace Express {
//         interface Request {
//           role?: string;
//         }
//     }
// }

// declare module 'express-serve-static-core' {

//     interface ProcessEnv {
//         JWT_ACCESS_SECRET_KEY: string;
//         JWT_REFRESH_SECRET_KEY: string;
//         NODE_ENV: string;
//         DOMAIN: string;
//         SENDER_EMAIL: string;
//         MAILGUN_API_KEY: string;
//     }

//     interface Request {
//         role?: string;
//     }
// }