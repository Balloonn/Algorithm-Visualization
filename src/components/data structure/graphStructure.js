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

    deleteNode(id) {
        for(let i = 0; i < this.nodes.length; i ++) {
            if(id == this.nodes[i].id) {
              this.nodes.splice(i,1);
            }
          }
        for(let i = 0; i < this.nodes.length; i ++) {
            let node = this.nodes[i];
            for(let j=0;j<node.adjList.length;j++) {
                if(node.adjList[j] == id) {
                    node.adjList.splice(j,1);
                  }
            }
            
        }
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

    clear() {
        this.nodes.splice(0,this.nodes.length);
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

    bipartite(id, ans) {
        let queue = [];
        let st = [];
        let color = [];
        queue.push(id);
        color[id] = 1;
        st[id] = true;
        ans.push({
            id:id,
            color:1,
        })

        while(queue.length > 0) {
            let curid = queue[0];
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
                    color[node.adjList[i]] = 3-color[node.id];
                    ans.push({
                        id:node.adjList[i],
                        color:3-color[node.id],
                    })
                }
                else {
                    if(color[node.adjList[i]] != 3-color[node.id])
                        return false;
                }
            }
        }

        return true;
    }

    topologicalSort() {
        let id = [];
        let q = [];
        let ans = [];
        let nodes = this.nodes;
        for(let i=0;i<nodes.length;i++) {
            id[nodes[i].id] = 0;
        }
        for(let i = 0; i < nodes.length; i ++) {
            const node = nodes[i];
            for(let j = 0; j < node.adjList.length; j ++) {
                id[node.adjList[j]] ++;
            }
        }
        for(let i = 0; i < nodes.length; i ++) {
            const node = nodes[i];
            if(id[node.id] == 0) {
                q.push(node.id);
                ans.push(node.id);
            }
        }
        while(q.length) {
            const node_id = q[0];
            let node = null;
            for(let i=0;i<nodes.length;i++) 
            {   
                if(node_id == nodes[i].id) {
                    node = nodes[i];
                }
            }
            q.splice(0,1);
            for(let i=0;i<node.adjList.length;i++) {
                id[node.adjList[i]] --;
                if(id[node.adjList[i]] == 0) {
                    q.push(node.adjList[i]);
                    ans.push(node.adjList[i]);
                }
            }
        }
        if(ans.length == nodes.length) {
            return ans;
        }
        else {
            return [];
        }
    }
    
}

