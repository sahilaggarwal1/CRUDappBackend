const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const router = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use('', router);

const DB_URI = process.env.MONGODB_URI;

app.get("/", (req, res) => {
    res.send("Backend API is working!");
});

app.listen(PORT, () => {
    mongoose.connect(DB_URI, {}).then(() => {
        console.log('Connection Established Successfully.');
    }).catch(err => console.log(err));
    console.log(`Server is running at PORT http://localhost:${PORT}`);
});
