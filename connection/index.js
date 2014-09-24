'use strict';

var mongoose = require('mongoose');
var DATABASE = 'lets-get-m';

exports.connect = function () {
    return mongoose.connect('mongodb://localhost/' + DATABASE);
};