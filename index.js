// // Import required packages
// import express from 'express';
// import dotenv from 'dotenv';
// import { connectDB } from './DB/connectionDB.js';
// import { appRouter } from './src/appRouter.js';

// // Load environment variables
// dotenv.config();

// // Initialize express app
// const app = express();
// const port = process.env.PORT;

// // Connect to database
// connectDB();

// // Setup routes
// appRouter(app, express);

// // Start server
// app.listen(port, () => {
//     console.log(`Server is running successfully on port ${port}`);
// });
// Import required packages
import express from 'express';
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import { connectDB } from './DB/connectionDB.js';
import { appRouter } from './src/appRouter.js';

// Load environment variables
dotenv.config();

// Initialize handler variable
let handler;

// Setup function to initialize express app and database connection
const setup = async () => {
    try {
        // Connect to database
        await connectDB(); // Must use await here

        // Initialize express app and routes
        const app = express();
        appRouter(app, express);

        // Create serverless handler after connection is established
        handler = serverless(app); // Handler must be created after connection
        console.log(`Server is running successfully on port ${process.env.PORT}`);

    } catch (error) {
        // Log error and create error handler
        console.error("❌ Error in setup:", error);
        handler = async (req, res) => {
            res.status(500).json({ success: false, message: "Server crash", error: error.message });
        };
    }
};

// Execute setup
await setup();

// Export handler for serverless function
export default async (req, res) => {
    return handler(req, res);
};