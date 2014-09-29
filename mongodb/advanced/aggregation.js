// This script is for running in mongo, the shell interface.
var i = 40;
var names = 'George|Samuel|Thomas|Benjamin|John'.split('|');
var colors = 'Red|Orange|Yellow|Blue|Green|Indigo|Violet'.split('|');

while (i--) {
    db.people.insert({
        name: names[i % names.length],
        number: i,
        color: colors[i % colors.length],
        rand: Math.random()
    });
}


// ================================================
db.people.aggregate([
    {
        $group: {
            _id: '$color',
            count: {
                $sum: 1
            }
        }     
    }
]);


// ================================================
// field path

db.people.find({});