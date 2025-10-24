import express from "express";
const app = express();

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
