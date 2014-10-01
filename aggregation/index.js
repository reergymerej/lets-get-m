'use strict';

var models;

exports.loadModels = function (m) {
    models = m;
};

exports.seed = function () {
    // populate a whole bunch of dudes
    var max = 30;
    var dudes = [];

    while (max--) {
        dudes.push(new models.Dude({
            isMale: max % 2 === 0,
            name: 'Dude #' + (max + 1),
            age: max,
            height: (max % 3) + max
        }));
    }

    // For bulk inserts, pass an array to `create`.
    // Each new document is included as an argument after `err`.
    models.Dude.create(dudes, function (err, firstDude) {
        if (err) {
            console.error(err);
        } else {
            console.log(arguments);
        }
    });
};

exports.run = function () {

    models.Dude.getTopX('age', function (err, dude) {
        console.log('top age');
        console.log(err, dude);
    });

    models.Dude.getTopX('name', function (err, dude) {
        console.log('top name');
        console.log(err, dude);
    });

    models.Dude.getTopX('height', function (err, dude) {
        console.log('top height');
        console.log(err, dude);
    });

// var db = {};

// // find highest age
// db.dudes.aggregate([

//     // sort by age
//     {
//         $sort: {
//             age: -1
//         }
//     },

//     // limit
//     {
//         $limit: 1
//     }
// ]);

};