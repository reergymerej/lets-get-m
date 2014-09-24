# Connection

[Mongoose docs](http://mongoosejs.com/docs/connections.html)

## Browsing MongoDB Documents

To connect to MongoDB through the terminal, use `mongo`.  Without the `--nodb` option, this will default to the *test* database.  Use a different database by including the [database address](http://docs.mongodb.org/manual/reference/program/mongo/#bin.mongo).

The examples here use the database *lets-get-m*.  To poke around, you'd use the following.

    mongo localhost/lets-get-m

Even better, you can omit localhost because it is the default.

    mongo lets-get-m
