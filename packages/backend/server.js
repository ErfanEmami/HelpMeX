import './config.js'
import connectDB from './db.js';
import app from './app.js';

// Connect to the database
connectDB();

// Start the server and listen on the defined port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
