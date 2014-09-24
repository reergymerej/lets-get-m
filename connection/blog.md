*Check out the [accompanying Github repo](https://github.com/reergymerej/lets-get-m) to these posts about MongoDB/Mongoose.*
***

Connecting to MongoDB with Mongoose is really easy.

```js
mongoose.connect('mongodb://localhost/my-cool-database');
```

Suppose you want to poke around your database outside of Mongoose, though.  How do you connect?  Use [mongo](http://docs.mongodb.org/manual/reference/program/mongo/#bin.mongo), the shell interface.

## Basic Connection

This connects to the "test" database on "localhost".

```sh
mongo
```

## Another Machine/Database

You can specify a different machine and/or database by specifying the "database address."

```sh
# connect to another database (on localhost)
mongo some-other-db

# connect to another machine/database
mongo whatever.com/some-db
```

**Warning**

You can connect to a machine without specifying a database, but this is **NOT** how to do it.

```sh
mongo localhost
```

This will connect you to "localhost" using the database "localhost."  If you want to connect without automatically selecting a database, use the `--nodb` option.

```sh
mongo localhost --nodb
```

From there, you can [connect to a database manually](http://docs.mongodb.org/manual/tutorial/write-scripts-for-the-mongo-shell/#mongo-shell-new-connections).

## Change Port

By default, MongoDB runs on port 10027.  If you're running on a different port, just include that in the "database address."

```sh
mongo whatever.com:12345/some-db
```

## Close Connection

Now you can connect to your MongoDB in a few different ways.  Since we haven't covered anything else yet, the final thing you need to learn is how to disconnect.  Baby steps, right?

You can close the connection with `exit` or <kbd>ctrl</kbd> + <kbd>c</kbd>.