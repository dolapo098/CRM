import { MissingParamtersError } from "../_helper/index.mjs";
import "dotenv/config";

// The File service contains the control logic for handlling file upload and getting uploaded files
export class FileUploadService {
  constructor(fieldValidator, fs, path, mime) {
    this._fieldValidator = fieldValidator;
    this._fs = fs;
    this._path = path;
    this._mime = mime;
  }
}

//The contol flow used for upload
FileUploadService.prototype.upload = function (params) {
  if (!params.filename) {
    throw new MissingParamtersError("no file uploaded");
  }
  const data = {
    fileName: params.filename,
    mimetype: params.mimetype,
  };
  return params;
  //   if (err instanceof multer.MulterError) {
  //     // A Multer error occurred when uploading.
  //   }
};

FileUploadService.prototype.download = async function (file) {
  try {
    if (!file) {
      throw new MissingParamtersError("no file uploaded");
    }
    const filePath = process.env.UPLOAD_FILE_PATH + file;
    await this._fs.promises.access(
      this._path.normalize(filePath),
      this._fs.F_OK
    );
    const filename = this._path.basename(filePath);
    const mimetype = this._mime.lookup(filePath);
    return { filename: filename, mimetype: mimetype, filePath: filePath };
  } catch (err) {
    console.log("error type is", err);
  }
};
