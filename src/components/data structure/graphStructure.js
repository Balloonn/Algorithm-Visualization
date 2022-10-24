/* eslint-disable */

class Node {
    constructor() {
        this.adjList = [];
        this.id;
        this.weights = [];
    }
}

export class GraphStructure{
    constructor() {
        this.nodes = [];
    };

    addNode (id) {
        const node = new Node();    
        node.id = id;
        this.nodes.push(node);
    }

    addEdge (source_id, target_id, weights) {
        let node0 = null;
        let node1 = null;
        for(let i = 0; i < this.nodes.length; i ++) {
            if(source_id == this.nodes[i].id) {
                node0 = this.nodes[i];
            }
            if(target_id == this.nodes[i].id) {
                node1 = this.nodes[i];
            }
        }
        if(node0 != null && node1 != null) {
            node0.adjList.push(node1.id);
            node0.weights.push(weights);
        }
    }

    dfs_init (id, ans) {
        let st = [];
        this.dfs(id, st, ans);
    }

    dfs(id, st, ans) {
        ans.push(parseInt(id));
        st[id] = true;
        let node = null;
        for(let i = 0; i < this.nodes.length; i ++) {
            if(id == this.nodes[i].id) {
                node = this.nodes[i];
            }
        }

        for(let i = 0; i < node.adjList.length; i ++) {
            if(!st[node.adjList[i]]) {
                this.dfs(node.adjList[i], st, ans);
            }
        }
    }

    bfs (id, ans) {
        let queue = [];
        let st = [];
        queue.push(id);
        st[id] = true;

        while(queue.length > 0) {
            let curid = queue[0];
            ans.push(parseInt(curid))
            queue.splice(0,1);
            let node = null;
            for(let i = 0; i < this.nodes.length; i ++) {
                if(curid == this.nodes[i].id) {
                    node = this.nodes[i];
                }
            }
            for(let i = 0; i < node.adjList.length; i ++) {
                if(!st[node.adjList[i]]) {
                    st[node.adjList[i]] = true;
                    queue.push(node.adjList[i]);
                }
            }
        }
    }

    // kruskal () {
    //     let nodes = this.nodes;
    //     let cnt = 0;
    //     let p = [];
    //     for(let i = 0; i < nodes.length; i ++) {
    //         p[nodes[i].id] = nodes[i].id;
    //     }
        
    // }

    // find (x, p) { 
    //     if(p[x] !== x) {
    //         p[x] = find(p[x], p);
    //     }
    //     return p[x];
    // }
}

