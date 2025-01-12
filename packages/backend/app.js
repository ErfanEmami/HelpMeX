import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth_routes.js';
import bookmarkRoutes from './routes/bookmarks_routes.js';
import sessionMiddleware from './middleware/sessionMiddleware.js';
import passport from "./passport/twitter_strategy.js"

const app = express();

// Middleware for parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS to allow requests from the frontend
app.use(cors({
  origin: 'http://localhost:5173', // Frontend origin (React app)
  credentials: true,  // Allow session cookies to be sent with requests
}));

// Session configuration with MongoStore
app.use(sessionMiddleware);

//initialize passport middleware after session middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/bookmarks', bookmarkRoutes); // Notes routes

export default app;
