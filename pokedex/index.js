// index.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint: Get Pokémon types
app.get('/get-pokemon-type', async (req, res) => {
  const { name } = req.query;

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    const types = response.data.types.map(typeInfo => typeInfo.type.name);
    res.send(types.join(', ')); // Sends plain text of the type(s)
  } catch (error) {
    res.status(404).send('Pokémon not found');
  }
});

// Endpoint: Get Pokémon image
app.get('/get-pokemon-image', async (req, res) => {
  const { name } = req.query;

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    const image = response.data.sprites.front_default;
    res.send(image); // Sends just the direct image URL
  } catch (error) {
    res.status(404).send('Image not found');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Pokédex server running at http://localhost:${PORT}`);
});