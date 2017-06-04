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

	delete(index){
		let node = this.find(index);
		if( node ){
			node = (this.root.getIndex() === node.getIndex()) ? this.root : node;
			let progeny = node.getProgeny();
			if( progeny.constructor.name === 'Node' ){
				if( progeny.getLeft().constructor.name === 'NullNode' && progeny.getRight().constructor.name === 'NullNode' ){
					node.setIndex(progeny.getIndex());
					node.setData(progeny.getData());
				}else{
					node = progeny;
				}
				progeny.delete();
			}
			return true;
		}

		return null;
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
