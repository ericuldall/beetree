# BeeTree

## A simple implementation of a binary search tree that can be balanced on demand

```
npm install --save beetree
```

```
var Tree = require('beetree');

var bst = new Tree;
bst.push(1, {foo: 'bar'});
bst.push(5, {chew: 'bacca'});
bst.push(3, {foo: 'baz'});
console.log('THE TREE:', JSON.stringify(bst, null, 4));
console.log('A SEARCH:', JSON.stringify(bst.find(5), null, 4));
console.log('GETTER:', bst.find(5).get('chew'));
bst.balance();
console.log(JSON.stringify(bst, null, 4));
```
