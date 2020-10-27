const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const mongoose = require('mongoose');
const logger = require('./common/logger');

mongoose.connect(MONGO_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', () => console.error('MongoDB connection error:')).once(
  'open', () => {
    console.log('Successfully connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}`);
    });
  }
);
