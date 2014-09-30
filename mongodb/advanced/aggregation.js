// This script is for running in mongo, the shell interface.
// var i = 40;
// var names = 'George|Samuel|Thomas|Benjamin|John'.split('|');
// var colors = 'Red|Orange|Yellow|Blue|Green|Indigo|Violet'.split('|');

var i = 10;
while (i--) {
    db.people.insert({
        // name: names[i % names.length],
        // number: i,
        // color: colors[i % colors.length],
        // rand: Math.random()
        arr: [1, 2, 3, 4]
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


db.people.aggregate([
    {
        $group: {
            _id: '$color',
            count: {
                $sum: 1
            },
            smallest: {
                $min: '$rand'
            }
        }     
    }
]);


// ================================================
// field path

db.people.find({});

// ================================================
// $limit
db.people.aggregate([{
    $limit: 3
}]);

// ================================================
// $sort
db.people.aggregate([{
    $sort: {
        name: 1
    }
}]);
// ================================================
// $skip
db.people.aggregate([{
    $skip: 38
}]);
// ================================================
// $match
db.people.aggregate([{
    $match: {
        color: 'Indigo'
    }
}]);
// ================================================
// $unwind
db.people.aggregate([{
    $unwind: '$arr'
}]);
// ================================================
// $out
db.people.aggregate([
    {
        $match: {
            name: 'Samuel'
        }
    },

    {
        $out: 'the-sams'
    }
]);