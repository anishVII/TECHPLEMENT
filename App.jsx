// src/App.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [authorSearch, setAuthorSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get('http://localhost:5173/quote/random');
      if (response.status === 200) {
        setQuote(response.data.quote);
      } else {
        throw new Error('Failed to fetch quote');
      }
    } catch (error) {
      console.error('Error fetching random quote:', error);
    }
  };

  const searchQuotes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/quote/search?author=${authorSearch}`);
      if (response.status === 200) {
        setSearchResults(response.data);
      } else {
        throw new Error('Failed to fetch quotes');
      }
    } catch (error) {
      console.error('Error searching quotes:', error);
    }
  };

  return (
    <div className="App">
      <h1>Quote of the Day</h1>
      <div className="quote-container">
        <p className="quote">{quote}</p>
        <button onClick={fetchRandomQuote}>Next Quote</button>
      </div>

      <div className="search-container">
        <h2>Search Quotes by Author</h2>
        <input
          type="text"
          value={authorSearch}
          onChange={(e) => setAuthorSearch(e.target.value)}
          placeholder="Enter author name"
        />
        <button onClick={searchQuotes}>Search</button>

        {searchResults.length > 0 && (
          <div className="search-results">
            <h3>Search Results:</h3>
            <ul>
              {searchResults.map((quote, index) => (
                <li key={index}>
                  <p>{quote.quote}</p>
                  <p>- {quote.author}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
