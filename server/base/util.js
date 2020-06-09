import path from "path";
import Boom from "boom";
import multer from "multer";


export function wrapAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(err => {
      if (!Boom.isBoom(err)) {
        err = Boom.boomify(err, {
          statusCode: err.status || err.statusCode || 500,
          override: true
        });
      }
      next(err);
    });
  };
}

export function diskFileUpload(storagePath, mimetype, sizeInKB) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join( storagePath));
    },
    filename: function (req, file, cb) {
      cb(
        null,
        `${Math.floor(1000 + Math.random() * 9000)}_${Date.now()}_${
          file.originalname
        }`
      );
    }
  });

  return multer({
    storage,
    limits: {
      fileSize: sizeInKB * 1024
    },
    fileFilter: function (req, file, cb) {
      if (file.mimetype.startsWith(mimetype)) {
        return cb(null, true);
      }
      cb(
        Boom.badRequest(
          `فایل آپلود شده نامعتبر است. ${file.mimetype} ${mimetype}`
        )
      );
    }
  });
}