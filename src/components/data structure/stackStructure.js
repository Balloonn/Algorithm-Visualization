/* eslint-disable */

class Node {
    constructor(value) {
        this.value = value; 
        this.next = null;
    }
}

export class StackStructure{
    constructor() {
        this.toppos = null;
        this.length = 0;
    };

    push (value) {
        const node = new Node(value);    
        node.next = this.toppos;
        this.toppos = node;
        this.length += 1;
    }

    pop () {
        if(this.length == 0) return false;
        this.toppos = this.toppos.next;
        this.length -= 1;
    }

    top() {
        if(this.length == 0) return false;
        return this.toppos.value;
    }    

    empty() {
        if(this.length) {
            return false;
        }
        return true;
    }

    size() {
        return this.length;
    }
    
    clear() {
        while(this.size()) {
            this.pop();
        }
    }

}

