const express = require('express');
const cors = require('cors');
const connectDb = require('./database/connectDb');
const userRoutes = require('./routes/users');
const likedSongsRoutes = require('./routes/likedSongs');
const path = require('path');
const dotenv = require('dotenv');

const app = express();
const port = process.env.PORT || 5000;

connectDb();

app.use(cors());
app.use(express.json());

dotenv.config({ path: './config.env' });

app.use('/api', userRoutes);
app.use('/api', likedSongsRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));
  app.use(express.static('public'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
