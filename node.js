'use strict';

class Node {

	constructor(index, data){
		this.index	= index;
		this.data		= data;
		this.left		= new NullNode;
		this.right	= new NullNode;
	}

	setIndex(index){
		this.index = index;
	}

	getIndex(){
		return this.index;
	}

	getAssignment(node){
		if( node.getIndex() <= this.getIndex() ){
			return this.getLeft().constructor.name === 'Node' ? this.getLeft().getAssignment(node) : this.setLeft(node);
		}else{
			return this.getRight().constructor.name === 'Node' ? this.getRight().getAssignment(node) : this.setRight(node);
		}
	}

	find(index){
		if( index < this.getIndex() ){
			return this.getLeft().constructor.name === 'Node' ? this.getLeft().find(index) : null;
		}else if( index === this.getIndex() ){
			return this;
		}else{
			return this.getRight().constructor.name === 'Node' ? this.getRight().find(index) : null;
		}
	}

	setData(data){
		this.data = data;
	}

	getData(){
		return this.data;
	}

	get(key){
		return this.data[key] || null;
	}

	set(key, val){
		this.data[key] = val;
	}

	setLeft(node){
		this.left = node;
	}

	getLeft(){
		return this.left;
	}

	setRight(node){
		this.right = node;
	}

	getRight(){
		return this.right;
	}

	getHeight(){
		return 1 + Math.max(this.getLeft().getHeight(), this.getRight().getHeight());
	}

	getProgeny(node){
		if( typeof node === "undefined" ){
			node = this.getLeft();
			if( node.constructor.name === 'NullNode' ){
				return this.getRight();
			}
		}

		let nextNode = node.getRight();
		if( nextNode.constructor.name === 'NullNode' ){
			return node;
		}else{
			return this.getProgeny(nextNode);
		}
	}

	flatten(){
		let results = [this.export()]
		if( this.getLeft().constructor.name === 'Node' ){
			results = results.concat(this.getLeft().flatten());
		}

		if( this.getRight().constructor.name === 'Node' ){
			results = results.concat(this.getRight().flatten());
		}

		return results;
	}

	export(preserve){
		return {index: this.getIndex(), data: this.getData(), __ref: this};
	}

	delete() {
		Object.setPrototypeOf(this, new NullNode);
		delete this.index;
		delete this.data;
		delete this.left;
		delete this.right;
	}

}

class NullNode {
	getAssignment(){
		return false;
	}

	getHeight(){
		return 0;
	}

	getDiameter(){
		return 0;
	}
}

module.exports = Node;
