// Imports
const express = require('express');
const app = express();
const questions = require('./routes/questions/questions');
const authorize = require('./routes/authorize/authorize');

// Default values
const DEFAULT_PORT = 5000;

// Request settings
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json({}));

// Temporary Redirection
app.get('/', (request, response) => {
    response.redirect('/questions');
});

// Handling routes
app.use('/questions', questions);
app.use('/authorize', authorize);

// Starting server on port
app.listen(process.env.PORT || DEFAULT_PORT);