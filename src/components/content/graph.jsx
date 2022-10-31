import React, { Component } from 'react';
import DataGraph from './../data/dataGraph';
import { DataGraphStructure } from './../data/dataGraph';
import { sleep } from './../sleep';
import G6_render_graph from './../G6_render_graph';

export class Graph extends Component {

    input_id = React.createRef();  
    input_type = React.createRef();

    add_items = React.createRef();
    add_type =  React.createRef();

    state = {
        graph:{

        },
    }
    
    async animationSearch (ans){
        for(let i = 0; i < ans.length; i ++) {
            let node = ans[i];
            for(let j = 0; j < DataGraph.state.nodes.length; j ++) {
                if(node == DataGraph.state.nodes[j].id) {
                    const item = this.state.graph.findById(`${node}`);
                    const model = {
                        style: {
                            fill: '#FF770F',
                            stroke: '#F3F0E7',
                            lineWidth: 1,
                          },
                    }
                    this.state.graph.updateItem(item, model);
                    await sleep(1000);
                }
            }
        }
        let buf = '';
        for(let i = 0; i < ans.length; i ++) {
            if(i) buf += '->';
            buf += ans[i];
        }
        alert(buf);
    }

    reset_color = () => {
        for(let i = 0; i < DataGraph.state.nodes.length; i ++) {
            let node = DataGraph.state.nodes[i].id;
            const item = this.state.graph.findById(`${node}`);
            const model = {
                style: {
                    fill: '#EAB4C4',
                    stroke: '#F3F0E7',
                    lineWidth: 1,
                  },
            }
            this.state.graph.updateItem(item, model);
        }
    }

    reset_value = () => {
        for(let i = 0; i < DataGraph.state.nodes.length; i ++) {
            let node = DataGraph.state.nodes[i].id;
            const item = this.state.graph.findById(`${node}`);
            this.state.graph.removeItem(item);
        }
        DataGraph.state.nodes.splice(0,DataGraph.state.nodes.length);
        DataGraphStructure.clear();
        DataGraph.state.edges.splice(0,DataGraph.state.edges.length);
        DataGraphStructure.nodes.splice(0,DataGraphStructure.nodes.length);
        this.update_adjlist();
    }
    
    async animationBipartite (ans) {
        for(let i = 0; i < ans.length; i ++) {
            let node = ans[i].id;
            let color = ans[i].color;
            for(let j = 0; j < DataGraph.state.nodes.length; j ++) {
                if(node == DataGraph.state.nodes[j].id) {
                    const item = this.state.graph.findById(`${node}`);
                    const model1 = {
                        style: {
                            fill: '#FF770F',
                            stroke: '#F3F0E7',
                            lineWidth: 1,
                          },
                    }
                    const model2 = {
                        style: {
                            fill: '#492D22',
                            stroke: '#F3F0E7',
                            lineWidth: 1,
                          },    
                    }
                    if(color == 1) {
                        this.state.graph.updateItem(item, model1);
                    }
                    if(color == 2) {
                        this.state.graph.updateItem(item, model2);
                    }
                    await sleep(1000);
                }
            }
        }
        alert("Finish")
    }

    getValue = () => {
        const id = this.input_id.current.value;
        const type = this.input_type.current.value;
        let ans = [];
        if(type === "dfs") {
            DataGraphStructure.dfs_init(id, ans);
            this.animationSearch(ans);
        }
        if(type === "bfs") {
            DataGraphStructure.bfs(id, ans);
            this.animationSearch(ans);
        }
        if(type === "bipartite") {
            if(DataGraphStructure.bipartite(id, ans)) {
                this.animationBipartite(ans);
            }
            else {
                alert("It is not bipartite graph !!");
            }
        }
    }   

    addItems = () => {
        const items = this.add_items.current.value;
        const type = this.add_type.current.value;
        if(type === "Add Nodes") {
            for(let i = 0; i < items.length; i++) {
                let buf = '';
                while(i < items.length && items[i]!=' ') {
                    buf += items[i];
                    i++;
                }
                DataGraph.state.nodes.push({
                    id: `${buf}`,
                    x: 640,
                    y: 480,
                    edges: [],
                    label: `${buf}`,
                })
                this.state.graph.addItem('node', {
                    x: 640,
                    y: 250,
                    id: `${buf}`,
                    label: `${buf}`,
                });
                DataGraphStructure.addNode(buf);
            }
            this.state.graph.updateLayout({
                type: 'force',
                center:[640,300],
                preventOverlap: true, // 布局参数，是否允许重叠
                nodeSize: 50, // 布局参数，节点大小，用于判断节点是否重叠
                linkDistance: 200, // 布局参数，边长
              });
        }
        if(type === "Add Edges") {
            for(let i = 0; i < items.length; i ++) {
                let buf = '';
                while(i < items.length && items[i]!=' ') {
                    buf += items[i];
                    i++;
                }
                let source = '';
                let target = '';
                let j = 0;
                while(j < buf.length && buf[j]!=',') {
                    source += buf[j];
                    j++;
                }
                j++;
                while(j < buf.length) {
                    target += buf[j];
                    j++;
                }

                this.state.graph.addItem('edge', {
                    source: source,
                    target: target,
                    id: `edge${DataGraph.state.edges.length}`,
                });
                DataGraph.state.edges.push({
                    source: source,
                    target: target,
                    id: `edge${DataGraph.state.edges.length}`,
                });
                DataGraphStructure.addEdge(source,target,1);

                this.state.graph.addItem('edge', {
                    source: target,
                    target: source,
                    id: `edge${DataGraph.state.edges.length}`,
                });
                DataGraph.state.edges.push({
                    source: target,
                    target: source,
                    id: `edge${DataGraph.state.edges.length}`,
                });
                DataGraphStructure.addEdge(target,source,1);
            }
            this.state.graph.updateLayout({
                type: 'force',
                center:[640,300],
                preventOverlap: true, // 布局参数，是否允许重叠
                nodeSize: 50, // 布局参数，节点大小，用于判断节点是否重叠
                linkDistance: 200, // 布局参数，边长
              });
        }
        if(type === "Edit Node") {
            let source = '';
            let target = '';
            let j = 0;
            while(j < items.length && items[j]!=' ') {
                source += items[j];
                j++;
            }
            j++;
            while(j < items.length) {
                target += items[j];
                j++;
            }
            for(let i = 0; i < DataGraph.state.nodes.length; i ++) {
                if(DataGraph.state.nodes[i].id == source) {
                    DataGraph.state.nodes[i].id = target;
                    DataGraph.state.nodes[i].label = target;
                }
            }

            for(let i = 0; i < DataGraph.state.edges.length; i ++) {
                if(DataGraph.state.edges[i].source == source) {
                    DataGraph.state.edges[i].source = target;
                }
                if(DataGraph.state.edges[i].target == source) {
                    DataGraph.state.edges[i].target = target;
                }
            }

            const node = this.state.graph.findById(`${source}`);
            this.state.graph.updateItem(node,{
                id:target,
                label:target,
            })
            
            const data = this.state.graph.save();
            for(let i = 0; i < data.nodes.length; i ++) {
                if(data.nodes[i].id == source) {
                    data.nodes[i].id = target;
                }
            }
            for(let i = 0; i < data.edges.length; i ++) {
                if(data.edges[i].source == source) {
                    data.edges[i].source = target;
                }
                if(data.edges[i].target == source) {
                    data.edges[i].target = target;
                }
            }
            
            this.state.graph.read(data)

            for(let i = 0; i < DataGraphStructure.nodes.length; i ++) {
                const node = DataGraphStructure.nodes[i];
                if(node.id == source) {
                    node.id = target;
                }
                else {
                    for(let j = 0; j < node.adjList.length; j ++) {
                        if(node.adjList[j] == source) {
                            node.adjList[j] = target;
                        }
                    }
                }
            }
        }
        this.update_adjlist();
    }
    
    update_adjlist = () => {
        let adjlist = document.getElementById('adjlist');
        let text = '';
        for(let i = 0; i < DataGraphStructure.nodes.length; i ++) {
            const node = DataGraphStructure.nodes[i];
            text += node.id;
            for(let j = 0; j < node.adjList.length; j ++) {
                text += '->';
                text += node.adjList[j];
            }
            text += '\n'
        }
        adjlist.innerText = text;
    }

    AdjList_show_hide = () => {
        let adjlist = document.getElementById('adjlist');
        if(adjlist.style.display == 'none') {
            adjlist.style.display = 'block'
        }
        else if(adjlist.style.display == 'block') {
            adjlist.style.display = 'none'
        }
    }

    render() {
        return (
            <div>
                <br />
                <div className='col-md-1.5 UI'>
                    <div className="input-group mb-3">
                        <select className='form-select' id='selector' defaultValue={'default'}>
                            <option value="default">Drag</option>
                            <option value="addNode">Add Node</option>
                            <option value="addEdge">Add Edge</option>
                            <option value="deleteNode">Delete Node</option>
                            <option value="deleteEdge">Delete Edge</option>
                        </select>
                        <button className="btn btn-outline-secondary" type="button" onClick={() => this.reset_value()}>Clear</button>
                    </div>
                </div>
                <div className='col-md-3.5 UI'>   
                    <div className="input-group mb-3">
                        <div className='col-md-2.5'>
                            <select ref={this.input_type} className='form-select' id='selector_algorithm' defaultValue={'dfs'}>
                                <option value="dfs">dfs</option>
                                <option value="bfs">bfs</option>
                                <option value="bipartite">bipartite</option>
                            </select>
                        </div>
                        <input ref={this.input_id} type="text" className="form-control" placeholder='Please input an id'></input>
                        <button className="btn btn-outline-secondary" type="button" onClick={() => this.getValue()}>Submit</button>
                        <button className="btn btn-outline-secondary" type="button" onClick={() => this.reset_color()}>Reset</button>
                    </div>
                </div>
                <div className='col-md-4.5 UI'>   
                    <div className="input-group mb-3">
                        <div className='col-md-2.5'>
                            <select ref={this.add_type} className='form-select' id='selector_algorithm' defaultValue={'Add Nodes'}>
                                <option value="Add Nodes">Add Nodes</option>
                                <option value="Add Edges">Add Edges</option>
                                <option value="Edit Node">Edit Node</option>
                            </select>
                        </div>
                        <input ref={this.add_items} type="text" className="form-control" placeholder='Please input a string'></input>
                        <button className="btn btn-outline-secondary" type="button" onClick={() => this.addItems()}>Submit</button>
                        <button className="btn btn-outline-secondary" type="button" onClick={() => this.AdjList_show_hide()}>AdjList</button>
                    </div>
                </div>
                <br />
                <br />
                <div style={{zIndex:1, width:'300px', float:'right', boxShadow: '5px 5px 2px #888888', borderStyle:'ridge', borderRadius:'1px', display:'none'}} id='adjlist'></div>
                <div id="graph_G6" style={{position:'absolute'}}></div>
            </div>
        );
    }
    
    componentDidMount() {
        this.setState({graph:G6_render_graph(DataGraph.state, 'graph_G6', DataGraphStructure)});
    }

}