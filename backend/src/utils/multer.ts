import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const absolutePath = path.join(__dirname, '../uploads/');
        cb(null, absolutePath);
    },
    filename: function (req, file, cb) {
        // Generate a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedFileExtensions = ['.jpg', '.jpeg', '.png'];

    // Check if the file extension is allowed
    const isAllowed = allowedFileExtensions.includes('.' + file.originalname.split('.').pop()!.toLowerCase());

    if (isAllowed) {
        cb(null, true);
    } else {
        cb(new Error('File type not allowed'));
    }
};
  
const upload = multer({ storage, fileFilter });

export { upload };