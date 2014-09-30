## Aggregation Cheatsheet

### $geoNear

    

```js
```

### $group

    

```js
```

### $limit

> { $limit: &lt;positive integer&gt; }

```js
db.people.aggregate([{
    $limit: 3
}]);
```    

### $match

> { $match: { &lt;query&gt; } }

```js
db.people.aggregate([{
    $match: {
        color: 'Indigo'
    }
}]);
```

### $out

> { $out: "&lt;output-collection&gt;" }

```js

```


### $project

    

```js
```


### $redact

    

```js
```


### $skip

> { $skip: &lt;positive integer&gt; }

```js
db.people.aggregate([{
    $skip: 38
}]);
```


### $sort

> { $sort: { &lt;field1&gt;: &lt;sort order&gt;, &lt;field2&gt;: &lt;sort order&gt; ... } }

```js
db.people.aggregate([{
    $sort: {
        name: 1
    }
}]);
```


### $unwind

> { $unwind: &lt;field path&gt; }

```js
db.people.aggregate([{
    $unwind: '$arr'
}]);
```