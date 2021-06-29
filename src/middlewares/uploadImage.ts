import { randomBytes } from 'crypto';
import * as multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import * as path from 'path';

import config from '../config/configuration';

const storage = new GridFsStorage({
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // randomBytes(16, (err, buf) => {
      //   if (err) {
      //     return reject(err);
      //   }
      //   const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          bucketName: 'uploads',
          filename: file.originalname,
        };
        resolve(fileInfo);
      // });
    });
  },
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  url: config.mongo,
});
const fileFilter = (req, file, cb) => {
  // if (path.extname(file.mimeType) !== '.pdf') {
  //         return cb(new Error('Only pdfs are allowed'))
  //  }

  cb(undefined, true);
};

const upload = multer({
  // fileFilter,
  storage,
}).single('image');
export { upload };
