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
import cookieParser from "cookie-parser";

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
import { checkAuth } from '../middlewares/isAuthenticated';
import { brandRouter } from '../routes/brands.routes';
import { OrderRouter } from '../routes/order.routes';
import { UserRouter } from '../routes/user.routes';
import { PaymentRouter } from '../routes/payment.routes';
import { upload } from '../utils/multer';
import { BadRequestError } from '../utils/errors/badRequest';
import { ProductImage } from '../models/mysql/Product';
import { SiteRouter } from '../routes/site.routes';

const sqliteStore = seq(session.Store);

const app = express();
dotenv.config();

// app.use(cors({
//     origin: 'http://localhost:5173',  // Replace with the origin(s) you want to allow
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, 
// }))

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use('/media/', express.static(path.join(__dirname, '..', 'uploads')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

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
    res.send("index")
});

app.post('/api/v1/upload', upload.single('file'), (req: Request, res: Response) => {
    res.json({ message: 'Files uploaded successfully', uploadedFileName: req.file!.filename });
});

app.post('/api/v1/uploads', upload.array('files'), (req: Request, res: Response) => {
    return res.json('Files uploaded successfully');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/categories', checkAuth, categoryRouter);
app.use('/api/v1/subcategories', checkAuth, subCategoryRouter);
app.use('/api/v1/childcategories', checkAuth, childCategoryRouter);
app.use('/api/v1/brands', checkAuth, brandRouter);
app.use('/api/v1/products', checkAuth, productRouter);
app.use('/api/v1/vendors', vendorRouter);
app.use('/api/v1/cart', CartRouter);
app.use('/api/v1/orders', checkAuth, OrderRouter);
app.use('/api/v1/payments', checkAuth, PaymentRouter);
app.use('/api/v1/site', checkAuth, SiteRouter);
app.use('/api/v1/users', UserRouter);

app.use(express.static(path.join(__dirname, "..", "..", '..', "adminpanel/dist")));

app.get("/admin/*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "..", "..", "..", "adminpanel", "dist", "index.html"))
);

app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "..", "..", "..", "adminpanel", "dist", "index.html"))
);

app.use(errorHandler);

export { app };