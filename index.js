const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const TOP_100_CRYPTO_URL = 'https://api.coingecko.com/api/v3/coins/markets';
const SUPPORTED_CURRENCIES = ['usd', 'eur'];

app.get('/top100', async (req, res) => {
  try {
    const response = await axios.get(`${TOP_100_CRYPTO_URL}`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching top 100 cryptocurrencies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/supported-currencies', (req, res) => {
  res.json(SUPPORTED_CURRENCIES);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
