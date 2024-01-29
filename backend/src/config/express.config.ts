import express, { Request, Response } from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import * as dotenv from 'dotenv';
import seq from 'connect-session-sequelize';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

import { productRouter } from '../routes/product.routes';
import './passport.config';
import { errorHandler } from '../middlewares/errorHandler';
import { morganMiddleware } from '../utils/Logger';
import { sequelize } from '../config/db.config';
import { authRouter } from '../routes/auth.routes';
import { vendorRouter } from '../routes/vendor.routes';
import { categoryRouter } from '../routes/category.routes';
import { CartRouter } from '../routes/cart.route';
import { subCategoryRouter } from '../routes/subcategories.routes';
import { childCategoryRouter } from '../routes/childcategories.routes';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_ACCESS_SECRET_KEY: string;
            JWT_REFRESH_SECRET_KEY: string;
            NODE_ENV: string;
            DOMAIN: string;
            SENDER_EMAIL: string;
            MAILGUN_API_KEY: string;
        }
    }

    namespace Express {
        interface Request {
            role?: string
        }
    }
}

const sqliteStore = seq(session.Store);

const app = express();
dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173',  // Replace with the origin(s) you want to allow
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
}))

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sessionStore = new sqliteStore({
    db: sequelize,
});

sessionStore.sync();

app.use(
    session({
        secret: '8fasfasfasfasfasfasdmkcanh0d',
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(morganMiddleware);

app.get('/', async (req: Request, res: Response) => {
    // const user = await User.findAndCountAll();
    res.send("index")
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/subcategories', subCategoryRouter);
app.use('/api/v1/childcategories', childCategoryRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/vendors', vendorRouter);
app.use('/api/v1/cart', CartRouter);

app.use(express.static(path.join(__dirname, "..", "..", '..', "adminpanel/dist")));

app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "..", "..", "..", "adminpanel", "dist", "index.html"))
);

app.use(errorHandler);

export { app };