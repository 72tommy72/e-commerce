import express from 'express';
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import { appRouter } from '../src/appRouter.js';
import { connectDB } from '../DB/connectionDB.js';

dotenv.config();

const app = express();

// ✅ Connect to DB
await connectDB();

// ✅ Load your app routes
appRouter(app, express);

// ✅ Add root route
app.get('/', (req, res) => {
    res.send('✅ E-commerce API is working!');
});

// ✅ Export default for Vercel
export default serverless(app);
