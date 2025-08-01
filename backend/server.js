import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoute from "./routes/userRoute.js";
import errorHandler from './middleWare/errorMiddleware.js';
import cookieParser from "cookie-parser";
import productRoute from "./routes/productRoute.js";
import contactRoute from "./routes/contactRoute.js";
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

// ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes middleware
app.use("/api/users", userRoute); 
app.use("/api/products", productRoute); 
app.use("/api/contactUs", contactRoute); 

// Routes 
app.get('/', (req, res) => {
  res.send('welcome to home page');
});

// Error handling middleware
app.use(errorHandler);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB successfully');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}



startServer();
