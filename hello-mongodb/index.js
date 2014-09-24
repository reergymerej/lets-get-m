'use strict';

exports.run = function (connection, models) {
    
    var gw = new models.Dude({
        isMale: true,
        name: 'George Washington'
    });

    gw.save(function (err, dude) {
        if (err) {
            console.error(err);
        } else {
            console.log(dude);
        }
    });
};
