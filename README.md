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
bst.delete(5);
console.log(JSON.stringify(bst, null, 4));
```

### Complexity

1. .push - O(log n)
2. .find - O(log n)
3. .balance - O(n log n) || O(n^3)
4. .delete - O(log n)
