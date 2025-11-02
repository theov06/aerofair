require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { Web3 } = require('web3');
const web3 = new Web3('https://rpc-mumbai.maticvigil.com');

const app = express();
app.use(express.json());

// Mock historical price data
const historicalPrices = {
  'YYZ-CDG': 650,
  'LAX-JFK': 350,
  'SFO-LHR': 800,
  'default': 500
};

// Mock flight API
const fetchFlightPrice = async (origin, destination) => {
  const basePrice = historicalPrices[`${origin}-${destination}`] || historicalPrices.default;
  const variance = Math.random() * 0.4 - 0.2; // ±20% variance
  return Math.floor(basePrice * (1 + variance));
};

// Price gouging detection
const detectPriceGouging = (currentPrice, historicalAvg) => {
  const threshold = historicalAvg * 1.15; // 15% above average
  return currentPrice > threshold;
};

// Negotiation function
const negotiatePrice = async (currentPrice, targetPrice) => {
  console.log(`Negotiating: Current $${currentPrice} → Target $${targetPrice}`);
  const reduction = Math.min(currentPrice * 0.1, currentPrice - targetPrice);
  return Math.floor(currentPrice - reduction);
};

// Main flight monitoring endpoint
app.post('/api/monitor-flight', async (req, res) => {
  const { origin, destination, date } = req.body;
  const route = `${origin}-${destination}`;
  
  try {
    const currentPrice = await fetchFlightPrice(origin, destination);
    const historicalAvg = historicalPrices[route] || historicalPrices.default;
    const isPriceGouging = detectPriceGouging(currentPrice, historicalAvg);
    
    let finalPrice = currentPrice;
    let negotiated = false;
    
    if (isPriceGouging) {
      finalPrice = await negotiatePrice(currentPrice, historicalAvg);
      negotiated = true;
    }
    
    res.json({
      success: true,
      data: {
        route: `${origin} → ${destination}`,
        date,
        originalPrice: currentPrice,
        finalPrice,
        historicalAvg,
        isPriceGouging,
        negotiated,
        savings: currentPrice - finalPrice,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/lock-escrow', async (req, res) => {
  const { user, amount } = req.body;
  // Simulate USDC lock
  res.json({ success: true, txHash: '0x123fake...' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AeroFair backend running on port ${PORT}`);
});