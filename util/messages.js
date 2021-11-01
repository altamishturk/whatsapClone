const moment = require('moment');

function messageFormet(name, message) {
    return {
        name,
        message,
        time: moment().format('LT')
    }
}

module.exports = messageFormet;