'use strict';

exports.run = function (connection, models) {
    
    var gw = new models.Dude({
        isMale: true,
        name: 'George Washington'
    });

    gw.save(function (err, run) {
        if (err) {
            throw err;
        } else {
            console.log(run);
        }

        console.log('done');
    });
};
