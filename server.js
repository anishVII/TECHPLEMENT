// quote-app-backend/server.js

const express = require('express');
const cors = require('cors');
const quotes = require('./quotes.json'); // Replace with your quote data source

const app = express();
const port = process.env.PORT || 5173;

app.use(cors());

// Endpoint to fetch a random quote
app.get('/quote/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  res.json(randomQuote);
});

// Endpoint to search quotes by author name
app.get('/quote/search', (req, res) => {
  const { author } = req.query;
  const filteredQuotes = quotes.filter(q => q.author.toLowerCase().includes(author.toLowerCase()));
  res.json(filteredQuotes);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
