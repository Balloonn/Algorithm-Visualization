import React, { Component, useEffect, useState, ReactDOM } from 'react';
import G6_render from './../G6_render';
import DataGraph from './../data/dataGraph';

export class Graph extends Component {
    state = { }
    
    render() {
        return (
            <div>
                <select className='form-select' id='selector' defaultValue={'default'}>
                    <option value="default">Drag</option>
                    <option value="addNode">Add Node</option>
                    <option value="addEdge">Add Edge</option>
                </select>

                <div id="graph_G6"></div>
            </div>
        );
    }

    componentDidMount() {
        G6_render(DataGraph.state, 'graph_G6');
    }
}