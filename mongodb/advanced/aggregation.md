# Aggregation

[Basic read operations](http://mean-greer.blogspot.com/2014/09/mongodb-crud-part-i.html) are fine, but what about looking at the documents and computing results?  To do that, we'll need to use aggregations.

## Seed the Database

Let's seed our database with some data we can aggregate.

```js
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
```

## Whet Your Whistle

The aggregation docs are pretty deep, especially when you're just looking for a simple answer.  So, to keep up the motivation, here's a quick taste of grouping.

```js
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
```

```sh
{
    "result" : [
        {
            "_id" : "Red",
            "count" : 6
        },
        {
            "_id" : "Indigo",
            "count" : 5
        },
        {
            "_id" : "Violet",
            "count" : 5
        },
        {
            "_id" : "Orange",
            "count" : 6
        },
        {
            "_id" : "Yellow",
            "count" : 6
        },
        {
            "_id" : "Blue",
            "count" : 6
        },
        {
            "_id" : "Green",
            "count" : 6
        }
    ],
    "ok" : 1
}
```

## What's All This "Pipeline" Nonsense?

You take a bunch of documents then run them through a series of [aggregations](http://docs.mongodb.org/manual/reference/operator/aggregation/#aggregation-pipeline-operator-reference).

## Map-Reduce?
http://docs.mongodb.org/manual/core/aggregation-introduction/#map-reduce

## References

* http://docs.mongodb.org/manual/core/aggregation-introduction/
* http://www.mkyong.com/mongodb/mongodb-aggregate-and-group-example/