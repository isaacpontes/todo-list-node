const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch((err) => console.error(err));