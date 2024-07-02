const axios = require('axios');

const fetchRandomQuote = async () => {
  try {
    const response = await axios.get('https://favqs.com/api/qotd');
    if (response.status === 200) {
      console.log('Quote of the Day:', response.data.quote.body);
      console.log('Author:', response.data.quote.author);
    } else {
      console.log('Failed to fetch quote of the day');
    }
  } catch (error) {
    console.error('Error fetching quote of the day:', error);
  }
};

fetchRandomQuote();
