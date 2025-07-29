import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
  }
});

// set up multer with the storage configuration
function fileFilter (req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('Only .png, .jpg and .jpeg formats are allowed!'), false);
    }
}


const upload = multer({ storage, fileFilter });

// file formatter 
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';   // special case for zero bytes
  const k = 1000;  // We use decimal system here (1000 bytes = 1 KB)
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];  // Units of sizes
  const i = Math.floor(Math.log(bytes) / Math.log(k));  // calculate size index
  const size = (bytes / Math.pow(k, i)).toFixed(2);  // divide bytes and round to 2 decimals
  return `${size} ${sizes[i]}`;  // return a string like "2.34 MB"
}
export { upload, formatFileSize };
