import express from 'express';
import authRoutes from './routes/auth_routes.js';
import noteRoutes from './routes/notes_routes.js';
import cors from 'cors';
import sessionMiddleware from './middleware/sessionMiddleware.js';
import passport from "./passport/passport_config.js"

const app = express();

// Middleware for parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS to allow requests from the frontend
app.use(cors({
  origin: 'http://localhost:3000',  // Frontend origin (React app)
  credentials: true,  // Allow session cookies to be sent with requests
}));

// Session configuration with MongoStore
app.use(sessionMiddleware);

//initialize passport middleware after session middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/notes', noteRoutes); // Notes routes

export default app;
