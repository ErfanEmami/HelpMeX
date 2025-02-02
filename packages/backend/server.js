import "./config.js";

import app from "./app.js";

// Start the server and listen on the defined port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
