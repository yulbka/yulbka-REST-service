const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const mongoose = require('mongoose');
const logger = require('./common/logger');
const userService = require('./resources/users/user.service');

mongoose.connect(MONGO_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', () => console.error('MongoDB connection error:')).once(
  'open', async () => {
    console.log('Successfully connected to MongoDB');
    await mongoose.connection.db.dropDatabase();
    await userService.post({ login: 'admin', password: 'admin' });
    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}`);
    });
  }
);
