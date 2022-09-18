import React, { Component } from 'react';
import G6_render from './../G6_render';
import DataGraph from './../data/dataGraph';
import { DataGraphStructure } from './../data/dataGraph';

export class Graph extends Component {
    state = { }
    
    render() {
        return (
            <div>
                <br />
                <div className='col-md-5 UI'>
                    <select className='form-select' id='selector' defaultValue={'default'}>
                        <option value="default">Drag</option>
                        <option value="addNode">Add Node</option>
                        <option value="addEdge">Add Edge</option>
                    </select>
                </div>
                <div className='col-md-6 UI'>
                    <div className="input-group mb-3">
                        <div className='col-md-3'>
                            <select className='form-select' id='selector_algorithm' defaultValue={'dfs'}>
                                <option value="dfs">dfs</option>
                                <option value="bfs">bfs</option>
                                <option value="kruskal">kruskal</option>
                                <option value="prim">prim</option>
                            </select>
                        </div>
                        <input type="text" className="form-control" placeholder="Text input with dropdown button"></input>
                        <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Submit</button>
                    </div>
                </div>
                
                <div id="graph_G6"></div>
            </div>
        );
    }

    componentDidMount() {
        G6_render(DataGraph.state, 'graph_G6', DataGraphStructure);
    }
}