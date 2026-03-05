const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5050;

// Serve static files from the React app build folder
const buildPath = path.join(__dirname, '../frontend/build');
app.use(express.static(buildPath));

// API routes can be added here
// Example:
// app.get('/api/example', (req, res) => {
//   res.json({ message: 'API endpoint example' });
// });

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Serving React app from: ${buildPath}`);
});

