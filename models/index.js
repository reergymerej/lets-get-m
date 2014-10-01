'use strict';

var mongoose = require('mongoose');

var dudeSchema = mongoose.Schema({
    name: String,
    age: Number,
    height: Number,
    isMale: Boolean
});

dudeSchema.statics.getTopX = function (x, callback) {
    var sortData = {};
    sortData[x] = -1;

    this.aggregate([
        // sort by x
        { $sort: sortData },

        // limit
        { $limit: 1 }
    ], function (err, dude) {
        if (err) {
            err = 'unable to find dude with top ' + x;
        }

        callback(err, dude);
    });
};


exports.Dude = mongoose.model('Dude', dudeSchema);