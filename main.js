import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './DB/connectionDB.js';
import { appRouter } from './src/appRouter.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB().then(() => {
    appRouter(app, express);

    app.listen(port, () => {
        console.log(`✅ Server running at http://localhost:${port}`);
    });
});
