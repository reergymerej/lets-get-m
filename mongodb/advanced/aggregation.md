# Aggregation

[Basic read operations](http://mean-greer.blogspot.com/2014/09/mongodb-crud-part-i.html) are fine, but what about looking at the documents and computing results?  To do that, we'll need to use aggregations.

First off, let's seed our database with some data we can aggregate.

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

Not so bad, right?  We pass an array of the aggregations we want to perform, each of which produces a new collection of documents.  This process is the [aggregation pipeline](http://docs.mongodb.org/manual/core/aggregation-pipeline/).

Since each aggregation produces a new collection of documents, we have to specify what those documents look like.  

* `_id` - the aggregate's `$color` value
* `count` - the sum of `$color` occurrences

`_id` is mandatory, since documents always have an `_id`.  If we would rather let MongoDB create one, though, we could have set the value to `null`.

### Accumulators

[Accumulators](http://docs.mongodb.org/manual/reference/operator/aggregation/group/#accumulator-operator) describe how the aggregation will gather up data to create the fields in the new documents.  We want a `count` field, so we have to specify how it will be created.  In our example, we used the `$sum` accumulator.

### Expressions

RESUME HERE: Elaborate on how fields in the new documents are described.


Our documents don't have a `$color` field; they have `color`.  What is this magic?

This is a [field path](http://docs.mongodb.org/manual/reference/glossary/#term-field-path).  Use this to access the current document's field values from inside an aggregation.







## Map-Reduce?
http://docs.mongodb.org/manual/core/aggregation-introduction/#map-reduce

## References

* http://docs.mongodb.org/manual/core/aggregation-introduction/
* http://www.mkyong.com/mongodb/mongodb-aggregate-and-group-example/
* http://docs.mongodb.org/manual/reference/operator/aggregation/group/#accumulator-operator
* http://docs.mongodb.org/manual/meta/aggregation-quick-reference/#aggregation-expressions
* http://docs.mongodb.org/manual/reference/operator/aggregation/group/#pipe._S_group