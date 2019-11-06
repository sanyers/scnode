global.seneca = require('seneca')({
    log: {
        level: 'none'
    },
    short: true
});
require('./prototypes');
global.httpReturn = require('./httpReturn').res;
require('./../config');
require('./librpc');
require('./libredis');
require('./libdb');