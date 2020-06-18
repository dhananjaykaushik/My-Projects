// Imports
const express = require('express');
const app = express();
const questions = require('./routes/questions/questions');
const users = require('./routes/users/users');

// Default values
const DEFAULT_PORT = 5000;

// Request settings
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json({}));

// Handling routes
app.use('/questions', questions);
app.use('/users', users);

// Starting server on port
app.listen(process.env.PORT || DEFAULT_PORT);