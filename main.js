// Import required packages
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './DB/connectionDB.js';
import { appRouter } from './src/appRouter.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.PORT;

// Connect to database
connectDB();

// Setup routes
appRouter(app, express);

// Start server
app.listen(port, () => {
    console.log(`Server is running successfully on port ${port}`);
});
