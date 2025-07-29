import multer from "multer";
import { dirname } from 'path';
// multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-")+ "-" + file.originalname) // 29/09/2025
  }
})

// set up multer with the storage configuration
function fileFilter (req, file, cb) {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      return cb(null, true)
} else{
    return cb(null, false)
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
