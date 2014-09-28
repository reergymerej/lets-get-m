Welcome to part two of our excellent adventure.  Before we resume, let's seed our database with some more documents to play with.

```js
var max = 33;
while (max--) {
    db.stomach.insert({
        name: 'Oreo',
        part: max % 3 === 0 ? 'white' : 'black'
    });
}
```

## Update

Now that we've got a bunch of Oreos in our `stomach` collection, I don't think the [Sweetwater](http://sweetwaterbrew.com/) we added in [Part I](http://mean-greer.blogspot.com/2014/09/mongodb-crud-part-i.html) was such a good idea.  Let's change it.

1. Find the documents we want to update.  We'll do that with another [query](http://docs.mongodb.org/manual/reference/glossary/#term-query).
2. Specify the new values.  That's done with the [update parameter](http://docs.mongodb.org/manual/reference/method/db.collection.update/#update-parameter).

```js
db.stomach.update(
    // query
    { beer: 'Sweetwater' },

    // update parameter
    {
        $set: {
            beer: 'root'
        }
    }
);
```

We changed the document's `beer` value from `'Sweetwater'` to `'root'`.  This did not affect the other fields in the document, as you can see.

```js
db.stomach.find({
    beer: {
        $exists: true
    }
}).pretty();

{
    "_id" : ObjectId("5424a5ba28f262081e997a7f"),
    "beer" : "root",
    "count" : 2
}
```

What if we want to [completely replace the fields](http://docs.mongodb.org/manual/reference/method/db.collection.update/#replace-a-document-entirely) in the document, though?  Who wants rootbeer with cookies?  Let's make it more complimentary to the other documents in the collection.

```js
db.stomach.update(
    // query
    {
        beer: {
            $exists: true
        }
    },

    // update parameter
    {
        drink: 'milk',
        type: 'skim',
        ounces: 8
    }
);
```

By specifying a plain object as the update parameter instead of [update operators](http://docs.mongodb.org/manual/reference/operator/update/#id1), we've completely changed the document.

```sh
> db.stomach.find({ drink: 'milk' }).pretty();
{
    "_id" : ObjectId("5424a5ba28f262081e997a7f"),
    "drink" : "milk",
    "type" : "skim",
    "ounces" : 8
}
```

Note that the `_id` does not change when using `update`, even when replacing the document.

Now, let's change all those old-fashioned Oreos to one of [the new flavors](http://www.oreo.com/wonderfilled/#wonderfilled_flavors).

```js
db.stomach.update(
    // query
    {
        name: 'Oreo',
        part: 'white'
    },

    // update parameter
    {
        $set: {
            part: 'berry'
        }
    }
);
```

Let's see the results.

```sh
> db.stomach.find({ name: 'Oreo', part: 'berry' }).pretty();
{
    "_id" : ObjectId("542603ba21330a1f47f4bd68"),
    "name" : "Oreo",
    "part" : "berry"
}
```

Only one of the documents was updated.  This brings us to the 3rd parameter of `update`, the options.  The options are described in [the documentation](http://docs.mongodb.org/manual/reference/method/db.collection.update/#db.collection.update), one of which is `multi`.  

```js
db.stomach.update(
    // query
    {
        name: 'Oreo',
        part: 'white'
    },

    // update parameter
    {
        $set: {
            part: 'berry'
        }
    },

    // options
    {
        multi: true
    }
);
```

```sh
> db.stomach.find({ name: 'Oreo', part: 'berry' }).count();
11
```

By default, `update` only modifies a single document.  With `multi`, we can make it update all the documents matched by our query.

## Delete

Now we've got a `stomach` collection full of berry cookies and milk and the anchovy pizza isn't really sitting well.  Let's barf it up.

```js
db.stomach.remove({
    anchovies: {
        $exists: true
    } 
});
```

That should seem pretty intuitive by now.

## References
* [MongoDB Update](http://docs.mongodb.org/manual/core/write-operations-introduction/#update)
* [MongoDB update operators](http://docs.mongodb.org/manual/reference/operator/update/#id1)
* [MongoDB Remove](http://docs.mongodb.org/manual/core/write-operations-introduction/#remove)
* [MongoDB db.collection.remove()](http://docs.mongodb.org/manual/reference/method/db.collection.remove/#db.collection.remove)

***
*Check out the [accompanying Github repo](https://github.com/reergymerej/lets-get-m) to these posts about MongoDB/Mongoose.*