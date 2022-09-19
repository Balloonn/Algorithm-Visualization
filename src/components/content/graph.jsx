import React, { Component } from 'react';
import G6_render from './../G6_render';
import DataGraph from './../data/dataGraph';
import { DataGraphStructure } from './../data/dataGraph';

export class Graph extends Component {

    input_id = React.createRef();  
    input_type = React.createRef();

    state = {
        algorithm_id:'', 
        algorithm_type:'',
    }
    
    getValue = () => {
        const id = this.input_id.current.value;
        const type = this.input_type.current.value;
        console.log(id)
        console.log(type)
        this.setState({algorithm_id:id,algorithm_type:type})
        console.log(this.state)
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
                    </select>
                </div>
                <div className='col-md-6 UI'>
                    <div className="input-group mb-3">
                        <div className='col-md-3'>
                            <select ref={this.input_type} className='form-select' id='selector_algorithm' defaultValue={'dfs'}>
                                <option value="dfs">dfs</option>
                                <option value="bfs">bfs</option>
                                <option value="kruskal">kruskal</option>
                                <option value="prim">prim</option>
                            </select>
                        </div>
                        <input ref={this.input_id} type="text" className="form-control" placeholder='Please input an id'></input>
                        <button className="btn btn-outline-secondary" type="button" onClick={() => this.getValue()}>Submit</button>
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