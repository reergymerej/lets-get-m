'use strict';

var mongoose = require('mongoose');

var dudeSchema = mongoose.Schema({
    name: String,
    age: Number,
    height: Number,
    isMale: Boolean
});

var Dude = mongoose.model('Dude', dudeSchema);

exports.Dude = Dude;