import React, { Component } from 'react';
import DataGraph from './../data/dataGraph';
import { DataGraphStructure } from './../data/dataGraph';
import { sleep } from './../sleep';
import G6_render_graph from './../G6_render_graph';

export class Graph extends Component {

    input_id = React.createRef();  
    input_type = React.createRef();

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
    }

    reset = () => {
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
        }
    }   
    
    render() {
        return (
            <div>
                <br />
                <div className='col-md-5 UI'>
                    <select className='form-select' id='selector' defaultValue={'default'}>
                        <option value="default">Drag</option>
                        <option value="addNode">Add Node</option>
                        <option value="addEdge">Add Edge</option>
                        <option value="deleteNode">Delete Node</option>
                        <option value="deleteEdge">Delete Edge</option>
                    </select>
                </div>
                <div className='col-md-6 UI'>
                    <div className="input-group mb-3">
                        <div className='col-md-3'>
                            <select ref={this.input_type} className='form-select' id='selector_algorithm' defaultValue={'dfs'}>
                                <option value="dfs">dfs</option>
                                <option value="bfs">bfs</option>
                                <option value="bipartite">bipartite</option>
                            </select>
                        </div>
                        <input ref={this.input_id} type="text" className="form-control" placeholder='Please input an id'></input>
                        <button className="btn btn-outline-secondary" type="button" onClick={() => this.getValue()}>Submit</button>
                        <button className="btn btn-outline-secondary" type="button" onClick={() => this.reset()}>Reset</button>
                    </div>
                </div>
                
                <div id="graph_G6"></div>
            </div>
        );
    }
    
    componentDidMount() {
        this.setState({graph:G6_render_graph(DataGraph.state, 'graph_G6', DataGraphStructure)});
    }

}