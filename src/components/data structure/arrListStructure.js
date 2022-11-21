/* eslint-disable */


export class ArrListStructure{
    constructor() {
        this.arrList = [];
    };

    insert(pos, value) {
        if(pos < 0 || pos > this.arrList.length) return false;
        if(!this.arrList[pos]) {
            this.arrList[pos] = value;
        }
        else {
            for(let i = this.arrList.length; i >= pos; i --) {
                this.arrList[i] = this.arrList[i-1];
            }
            this.arrList[pos] = value;
        }
    }

    delete(pos) {
        if(pos < 0 || pos >= this.arrList.length) return false;
        for(let i = pos; i + 1 < this.arrList.length; i ++) {
            this.arrList[i] = this.arrList[i+1];
        }
        this.arrList.splice(this.arrList.length-1,1);
    }

    edit(pos, value) {
        if(pos < 0 || pos >= this.arrList.length) return false;
        this.arrList[pos] = value;
    }

    swap(pos1, pos2) {
        if(pos1 < 0 || pos1 >= this.arrList.length) return false;
        if(pos2 < 0 || pos2 >= this.arrList.length) return false;
        const value = this.arrList[pos1];
        this.arrList[pos1] = this.arrList[pos2];
        this.arrList[pos2] = value;
    }

    clear() {
        this.arrList.splice(0, this.arrList.length)
    }
}

