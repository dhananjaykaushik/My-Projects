const EventEmitter = require('events');

class Logger extends EventEmitter {

    log(message) {
        this.emit('KEY', 'My message ' +  new Date().getTime());
    }

}
module.exports = Logger;