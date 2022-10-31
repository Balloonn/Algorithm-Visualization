/* eslint-disable */


export class ArrListStructure{
    constructor() {
        this.arrList = [];
    };

    insert(pos, value) {
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
        for(let i = pos; i + 1 < this.arrList.length; i ++) {
            this.arrList[i] = this.arrList[i+1];
        }
        this.arrList.splice(this.arrList.length-1,1);
    }

    edit(pos, value) {
        this.arrList[pos] = value;
    }

    swap(pos1, pos2) {
        const value = this.arrList[pos1];
        this.arrList[pos1] = this.arrList[pos2];
        this.arrList[pos2] = value;
    }

    clear() {
        this.arrList.splice(0, this.arrList.length)
    }
}

