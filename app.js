const express = require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const { mongoURI } = require('./keys');

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to Mongo!!');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting!!', err);
});

app.use(express.json());
require('./models/user');
require('./models/post');

app.use(require('./routes/auth'));
app.use(require('./routes/post'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log('Server is running...', PORT);
});
