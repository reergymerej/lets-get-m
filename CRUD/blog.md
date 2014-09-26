# MongoDB CRUD: Part II

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

Now that we've got a bunch of Oreos in our `stomach` collection, I don't think the [Sweetwater](http://sweetwaterbrew.com/) we added in [Part I](http://mean-greer.blogspot.com/2014/09/mongodb-crud-part-i.html) was such a good idea.  Let's change it to something more complimentary.

First, we have to find the documents we want to update.  We'll do that with another [query](http://docs.mongodb.org/manual/reference/glossary/#term-query).

Second, we have to specify the new values.  That's done with the [update parameter](http://docs.mongodb.org/manual/reference/method/db.collection.update/#update-parameter).

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

We changed the document's `beer` value from `'Sweetwater'` to `'root'`.  This did not affect the other fields in the document, as you can see with

```js
db.stomach.find({ beer: 'root' });
```

What if we want to [completely replace the fields](http://docs.mongodb.org/manual/reference/method/db.collection.update/#replace-a-document-entirely) in the document, though?  Who wants rootbeer with their cookies?

TODO: Resume here.


## Delete

## References

* [MongoDB Update](http://docs.mongodb.org/manual/core/write-operations-introduction/#update)
