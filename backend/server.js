import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoute from "./routes/userRoute.js";
import errorHandler from './middleWare/errorMiddleware.js';
import cookieParser from "cookie-parser";
dotenv.config();
 
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes middleware
app.use("/api/users", userRoute); 

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
