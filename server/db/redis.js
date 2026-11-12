require('dotenv').config();
const { createClient } = require('redis');

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on('error', err => console.error('Redis Client Error', err.message));

client.connect()
  .then(() => {
    console.log('Redis connection successful');
  })
  .catch((err) => {
    console.error('Could not connect to Redis on startup, continuing without cache:', err.message);
  });

module.exports = client;