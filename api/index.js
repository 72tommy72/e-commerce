import express from 'express';
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import { appRouter } from '../src/appRouter';
import { connectDB } from '../DB/connectionDB';


// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to DB then apply routes
connectDB();
appRouter(app, express);

// Export for Vercel
export default serverless(app);
