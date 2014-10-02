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

### Whoa, Nellie!

Aggregation can be confusing when you first run into it, which usually happens when trying to figure out how to do grouping.  That's why I've shown `$group` above, but it's is actually one of the trickier [aggregation stages](http://docs.mongodb.org/manual/reference/operator/aggregation-pipeline/).

I suggest slowing down and learning how aggregation works at a high level to allow the concepts to sink in.  Once you get that, the specifics are easily demystified by referring to the docs.

## How Does Aggregation Work?

Simply put, aggregation takes a collection of documents and turns them into a new collection of documents.  Each of these transformations is referred to as an *aggregation stage*.  How each *aggregation stage* works varies, but you can figure them out easily once you understand what you're looking at.

Aggregation works by passing a collection through a series of stages, each changing the collection and passing it off to the next stage.  This is the [aggregation pipeline](http://docs.mongodb.org/manual/core/aggregation-pipeline/).

**An Example**

```js
db.people.aggregate([
    // Change the documents in people by sorting.
    { $sort: { name: -1 } },

    // Change the sorted documents from the previous stage
    // by limiting them to the first 3.
    { $limit: 3 },

    // Change which fields are present in the
    // 3 sorted documents.
    { $project: { _id: 0, name: 1, color: 1 } }
]);

{
    "result" : [
        {
            "name" : "Thomas",
            "color" : "Violet"
        },
        {
            "name" : "Thomas",
            "color" : "Green"
        },
        {
            "name" : "Thomas",
            "color" : "Yellow"
        }
    ],
    "ok" : 1
}
```

### What is the Result?

This makes sense, but what is this new object structure?  It's not a collection like we saw in the [CRUD post](http://mean-greer.blogspot.com/2014/09/mongodb-crud-part-i.html).  According to [TFM](http://docs.mongodb.org/manual/reference/method/db.collection.aggregate/#cursor-behavior), it is a [cursor](http://docs.mongodb.org/manual/core/cursors/#read-operations-cursors).

*Remember, in mongo, the shell interface, cursors are printed out automatically when you don't assign the operation to a variable.*

So, it says it's a cursor, and it has the documents in `result`, but there's definitely something different.  Let's compare the keys in the two different cursor types.

```js
var findCursor = db.people.find();
var aggregateCursor = db.people.aggregate([{ $limit: 10 }]);

Object.keys(findCursor).sort();

[
    "_batchSize",
    "_collection",
    "_cursor",
    "_db",
    "_fields",
    "_limit",
    "_mongo",
    "_ns",
    "_numReturned",
    "_options",
    "_query",
    "_skip",
    "_special"
]

Object.keys(aggregateCursor).sort();

[ "ok", "result" ]
```

Now, those don't appear to be the same, but cursors warrant their own post.

### Tips for Working Through Aggregation

In my first draft, I got right into explaining each of the rabbit holes in the aggregation stages.  That's dumb.  Instead, I would like to teach you to fish.

#### Plan it Out

Figure out what it is you want to do, like this.

```js
db.people.aggregate([
    // group by color

    // sort by count of color

    // pick the top 2

    // remove all the fields except the color
]);
```

#### Pick the Stages

There are only 10 [aggregation stages](http://docs.mongodb.org/manual/reference/operator/aggregation/).  Read the descriptions to see which one(s) you want to you use.

```js
db.people.aggregate([
    // group by color
    { $group: {} },

    // sort by count of color
    { $sort: {} },

    // pick the top 2
    { $limit: {} },

    // remove all the fields except the color
    { $project: {} }
]);
```

#### Set the Stages Up

Now that you know what stages you'll use, go through them one-by-one and read the docs.  With our cheatsheet, you can keep your eyes on the prize.  It's less likely to you'll be overwhelmed or distracted by all the new concepts and terminology that come along with aggregation.

Right at the top of each stage's docs, it shows the structure we need to use.  Additionally, they include lots of detail and several examples.  *Just fight the temptation to get distracted.*

If you can, you should end up with something like this.

```js
db.people.aggregate([
    // group by color
    {
        $group: {
            _id: '$color',
            count: {
                $sum: 1
            }
        }
    },

    // sort by count of color
    { $sort: { count: -1 } },

    // pick the top 2
    { $limit: 2 },

    // remove all the fields except the color
    {
        $project: {
            _id: 0,
            color: '$_id'
        }
    }
]);

{
    "result" : [
        {
            "color" : "Orange"
        },
        {
            "color" : "Red"
        }
    ],
    "ok" : 1
}
```

================================================

## References
* [Basic read operations](http://mean-greer.blogspot.com/2014/09/mongodb-crud-part-i.html)
* [aggregation stages](http://docs.mongodb.org/manual/reference/operator/aggregation-pipeline/)
* [aggregation pipeline](http://docs.mongodb.org/manual/core/aggregation-pipeline/)
* [CRUD post](http://mean-greer.blogspot.com/2014/09/mongodb-crud-part-i.html)
* [TFM](http://docs.mongodb.org/manual/reference/method/db.collection.aggregate/#cursor-behavior)
* [cursor](http://docs.mongodb.org/manual/core/cursors/#read-operations-cursors)
* [aggregation stages](http://docs.mongodb.org/manual/reference/operator/aggregation/)