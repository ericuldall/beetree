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
		let newRoot = list.splice(Math.floor((list.length - 1) / 2), 1)[0];
		this.root = new Node(newRoot.index, newRoot.data);
		while(list.length > 1){
			let left = list.splice(0, Math.floor(list.length / 2));
			let right= list;
			let left_node = left.splice(Math.floor((list.length - 1) / 2), 1)[0];
			let right_node = right.splice(Math.floor((list.length - 1) / 2), 1)[0];
			this.push(left_node.index, left_node.data);
			this.push(right_node.index, right_node.data);
			list=left.concat(right);
		}
		if( list.length ){ this.push(list[0].index, list[0].data); }
	}
}

module.exports = Tree;
