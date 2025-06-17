const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

// Home route
app.get('/', (req, res) => {
  res.send('Timestamp Microservice is working!');
});

// Main route (handle optional date manually)
app.get('/api/:date', (req, res) => {
  let dateParam = req.params.date;

  // If it's a number, treat as Unix
  if (!isNaN(dateParam)) {
    dateParam = parseInt(dateParam);
  }

  const date = new Date(dateParam);

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// Special route when no date is provided
app.get('/api', (req, res) => {
  const date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
