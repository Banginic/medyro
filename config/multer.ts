import multer from "multer";

import cloudinary from "./cloudinary.js";

const upload = multer({ storage: multer.memoryStorage() });



export default upload;