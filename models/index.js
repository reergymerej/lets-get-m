'use strict';

var mongoose = require('mongoose');

var dudeSchema = mongoose.Schema({
    name: String,
    age: Number,
    height: Number,
    isMale: Boolean
});

var getXByY = function (x, y, callback) {
    var sortData = {};
    sortData[x] = y;

    this.aggregate(
        [
            // sort by x
            { $sort: sortData },

            // limit
            { $limit: 1 }
        ],
        callback
    );
};

dudeSchema.statics.getTopX = function (x, callback) {
    return getXByY.apply(this, [x, -1, callback]);
};

dudeSchema.statics.getBottomX = function (x, callback) {
    return getXByY.apply(this, [x, 1, callback]);
};

dudeSchema.statics.getXByY = getXByY;


exports.Dude = mongoose.model('Dude', dudeSchema);