const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const databaseUrl = process.env.MONGO_URI;

mongoose.connect(databaseUrl, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});


const databse = mongoose.connection;

databse.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

databse.once('open', () => {
    console.log('Connected to MongoDB!');
});