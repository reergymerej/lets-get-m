'use strict';

var connection = require('./connection/index.js').connect();
var models = require('./models/index.js');
var helloMongodb = require('./hello-mongodb/index.js');
var aggregation = require('./aggregation/index.js');

// helloMongodb.run(connection, models);
aggregation.loadModels(models);
// aggregation.seed();
aggregation.run();

