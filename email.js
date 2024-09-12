// app.js
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import emailRouter from './routes/emailRouter.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests

// Routes
app.use('/api', emailRouter); // Use the email router with a base path of '/api'

// Server setup
const PORT = process.env.PORT || 3000; // Fallback to port 3000 if PORT is not defined
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
