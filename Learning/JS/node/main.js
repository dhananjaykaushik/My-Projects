/*
* os : Operating system
* fs : File system
* events : Events
* http : HTTP
*/

// const logger = require('./logger');

// logger.log('HELLO');

// const Logger = require('./logger');
// const loggerObj = new Logger();

// loggerObj.on('KEY', (m) => {
//     console.log(m);
// });

// loggerObj.log('Hello');
// loggerObj.log('Hello');
// loggerObj.log('Hello');
// loggerObj.log('Hello');
// loggerObj.log('Hello');

// const http = require('http');

// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.write('HELLO WORLD');
//         res.end();
//     }
// });

// server.listen(4200);
// console.log('Listening to port 4200');

const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('HELLO');
    res.end();
});

app.listen(4200);

console.log('Listening to port 4200');



