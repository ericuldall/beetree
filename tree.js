'use strict';

var Node = require('./node');

class Tree {
	push(index, data){
		let pendingNode = new Node(index, data);
		if( this.root == null ){
			return this.root = pendingNode;
		}
		this.root.getAssignment(pendingNode);
	}

	find(index){
		return this.root.find(index);
	}

	flatten(){
		return this.root.flatten().sort(function(a,b){ return (a.index > b.index ? 1 : (a.index < b.index ? -1 : 0)); });
	}

	balance(){
		let list = this.flatten();
		let newRoot = list.splice(Math.round((list.length - 1) / 2), 1)[0];
		this.root = new Node(newRoot.index, newRoot.data);
		while(list.length > 1){
			let node = list.splice(Math.round((list.length - 1) / 2), 1)[0];
			this.push(node.index, node.data);
		}
		this.push(list[0].index, list[0].data);
	}
}

module.exports = Tree;
/*
var bst = new Tree;
bst.push(1, {foo: 'bar'});
bst.push(4, {});
bst.push(6, {});
bst.push(3, {});
bst.push(12, {});
bst.push(22, {});
bst.push(45, {});
bst.push(2, {});
bst.balance();
console.log(JSON.stringify(bst, null, 4));
*/
