const express = require('express');
const cors = require('cors');
const multer = require('multer');

/* Import routes */
const userRoutes = require('./routes/user');
const gamesessRoutes = require('./routes/gamesess');
const statsRoutes = require('./routes/stats');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* Routes used */
app.use('/users', userRoutes);
app.use('/gamesess', gamesessRoutes);
app.use('/stats', statsRoutes);

app.use((req, res, next) => { res.status(404).json({ message: 'Endpoint not found' }) });

module.exports = app;