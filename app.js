'use strict';

var connection = require('./connection/index.js').connect();
var models = require('./models/index.js');
var helloMongodb = require('./hello-mongodb/index.js');

helloMongodb.run(connection, models);