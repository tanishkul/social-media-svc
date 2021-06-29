import * as multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

import config from '../config/configuration';

const storage = new GridFsStorage({
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        bucketName: 'posts',
        filename: file.originalname,
      };
      resolve(fileInfo);
    });
  },
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  url: config.mongo,
});

const upload = multer({
  storage,
}).single('image');
export { upload };
