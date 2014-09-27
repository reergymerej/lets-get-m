In a previous post, I wrote the "M" in MEAN really stands for Mongoose as it is the de facto way to work with MongoDB.  However, it's interesting to peek beneath the surface.  You don't have to be able to rebuild a manifold in order to drive, but you should probably know how to check the oil.

So, now that we know [how to connect](http://mean-greer.blogspot.com/2014/09/connecting-to-mongodb.html), let's figure out how to CRUD [documents](http://docs.mongodb.org/manual/core/document/).

## Create

Databases contain collections.  Collections contain documents.  To insert a new document into a collection, we use the `insert` method.

```sh
db.stomach.insert({
    crust: 'thin',
    pepperoni: true,
    olives: true,
    anchovies: 6
});
```

Easy, right?  That inserted a pizza-like document into the `stomach` collection.  Let's try it again.

```sh
db.stomach.insert({
    beer: 'Sweetwater',
    count: 2
});
```

Pretty straightforward.  Also, this demonstrates why NoSQL databases are so cool; documents within a collection don't have to have to the same fields.  Collections are like tables, but friendlier.  Do you remember going into admin mode and creating the `stomach` table before we ran these queries?

Exactly.

## Read

Now that's we've got a collection and a couple documents, let's see about reading them.  What was our collection's name again?

```sh
> show collections
stomach
system.indexes

```

Oh, yeah, `stomach`.  Let's see what's in there.

```sh
> db.stomach.find().pretty();
{
    "_id" : ObjectId("5424a39628f262081e997a7e"),
    "crust" : "thin",
    "pepperoni" : true,
    "olives" : true,
    "anchovies" : 6
}
{
    "_id" : ObjectId("5424a5ba28f262081e997a7f"),
    "beer" : "Sweetwater",
    "count" : 2
}

```

As you can see, MongoDB inserted a unique _id for us because we didn't include one.

[find](http://docs.mongodb.org/manual/reference/method/db.collection.find/#db.collection.find) can take a couple arguments to make it more useful.

* an object of [query operators](http://docs.mongodb.org/manual/reference/operator/query/) - This specifies what documents you're looking for.
* an object of [projection operators](http://docs.mongodb.org/manual/reference/operator/projection/) - This specifies what fields you want returned in the results.

```sh
db.stomach.find(
    {
        anchovies: {
            $exists: true
        }
    },

    {
        crust: 1,
        pepperoni: 1,
        donkey: 1
    }
);
```

I'm not going to go over all the options as the documentation is very good, but you get the idea.  A couple notes, though.

* It's worth noting that `find` returns a [cursor](http://docs.mongodb.org/manual/core/cursors/) that you can iterate through to see the returned documents.  Because we didn't assign the expression to a variable, mongo printed out the first 20 results automatically.
* `_id` is returned unless you explicitly exclude it in the projection.  You can't mix includes and excludes in your projection with the exception of the `_id` field.
* We included `donkey` in the projection, but it doesn't exist.  Therefore, it was not in the result.

## Summary

My wife just turned on [Bill a Ted](http://www.imdb.com/title/tt0096928/) and it's surprisingly distracting.  That means, **Update** and **Delete** will come in part II of this post.  Party on, dudes!

## References
* From within [mongo](http://docs.mongodb.org/manual/reference/program/mongo/#bin.mongo), just type `help`.  It's very good.
* [MongoDB CRUD operations](http://docs.mongodb.org/manual/crud/)
* [MongoDB Glossary](http://docs.mongodb.org/manual/reference/glossary/)
* [MongoDB Create](http://docs.mongodb.org/manual/core/write-operations-introduction/#write-op-insert)
* [MongoDB Read](http://docs.mongodb.org/manual/core/read-operations-introduction/)
* [mongo shell reference](http://docs.mongodb.org/manual/reference/mongo-shell/)

***
*Check out the [accompanying Github repo](https://github.com/reergymerej/lets-get-m) to these posts about MongoDB/Mongoose.*