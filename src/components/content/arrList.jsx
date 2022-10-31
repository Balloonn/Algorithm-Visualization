import React, { Component } from 'react';
import G6_render_arrList from '../G6_render_arrList';
import { DataArrListStructure } from './../data/dataArrList';
import DataArrList from './../data/dataArrList';
import { sleep } from './../sleep';

class ArrList extends Component {
    input_position = React.createRef();
    input_value = React.createRef();  
    input_type = React.createRef();
    algorithm_type = React.createRef();
    algorithm_value = React.createRef();

    state = { 
        graph: {

        },
        animationstep: 1000,
     } 

    getValue = () => {
        const type = this.input_type.current.value;
        const position = this.input_position.current.value;

        if(type === "insert") {
            const value = this.input_value.current.value;
            this.insert(DataArrList, DataArrListStructure, position, value)
        }
        if(type === "delete") {
            this.delete(DataArrList, DataArrListStructure, position)
        }
        if(type === "edit") {
            const value = this.input_value.current.value;
            this.edit(DataArrList, DataArrListStructure, position, value)
        }
    }   

    insert = (Data, DataStructure, pos, value) => {
        for(let i = DataStructure.arrList.length; i >= pos; i --) {
            Data.state.nodes[i] = Data.state.nodes[i-1];
        }
        Data.state.nodes[pos] = {
            id: `${pos}`,
            label: `${value}`,
        }
        for(let i = 0; i < Data.state.nodes.length; i ++) {
            Data.state.nodes[i] = {
                id: `${i}`,
                x: (i % 12 + 1)* 100 - 10,
                y: (Math.floor(i / 12) + 1) * 100,
                label:Data.state.nodes[i].label,
            }
        }
        DataStructure.insert(pos, value);
        this.state.graph.read(Data.state)
    }

    delete = (Data, DataStructure, pos) => {
        for(let i = parseInt(pos); i + 1 < DataStructure.arrList.length; i ++) {
            Data.state.nodes[i] = Data.state.nodes[i+1];
        }
        
        for(let i = 0; i < Data.state.nodes.length; i ++) {
            console.log(Data.state.nodes[i])
            Data.state.nodes[i] = {
                id: `${i}`,
                x: (i % 12 + 1)* 100 - 10,
                y: (Math.floor(i / 12) + 1) * 100,
                label:Data.state.nodes[i].label,
            }
        }
        DataStructure.delete(pos);
        Data.state.nodes.splice(DataStructure.arrList.length,1);
        this.state.graph.read(Data.state)
    }

    edit = (Data, DataStructure, pos, value) => {
        Data.state.nodes[pos].label = value;
        DataStructure.edit(pos, value);
        this.state.graph.read(Data.state)
    }

    start_algorithm = () => {
        const type = this.algorithm_type.current.value;
        if(type === "Bubble Sort") {
            this.bubble_sort(DataArrList, DataArrListStructure)
        }
        if(type === "Binary Search") {
            const value = this.algorithm_value.current.value;
            this.binary_search(DataArrList, DataArrListStructure, value);
        }
    }

    async bubble_sort(Data, DataStructure){
        for(let i = Data.state.nodes.length - 1; i > 0; i --) {
            for(let j = 0; j < i; j ++) {
                const value_j = parseInt(Data.state.nodes[j].label);
                const value_j1 = parseInt(Data.state.nodes[j+1].label);
                const node1 = this.state.graph.findById(`${j}`);
                const node2 = this.state.graph.findById(`${j+1}`);
                const model1 = {
                    style: {
                        fill: '#FF770F',
                        stroke: '#F3F0E7',
                        lineWidth: 1,
                        },
                }
                const model2 = {
                    style: {
                        fill: '#FF770F',
                        stroke: '#F3F0E7',
                        lineWidth: 1,
                        },
                }
                this.state.graph.updateItem(node1, model1);
                this.state.graph.updateItem(node2, model2);
                await sleep(this.state.animationstep);
                if(value_j > value_j1) {
                    const label = Data.state.nodes[j].label;
                    Data.state.nodes[j].label = Data.state.nodes[j+1].label;
                    Data.state.nodes[j+1].label = label;

                    DataStructure.swap(j,j+1)
                    this.state.graph.read(Data.state)
                    await sleep(this.state.animationstep);
                }
                const model3 = {
                    style: {
                        fill: '#EAB4C4',
                        stroke: '#F3F0E7',
                        lineWidth: 1,
                        },
                }
                const model4 = {
                    style: {
                        fill: '#EAB4C4',
                        stroke: '#F3F0E7',
                        lineWidth: 1,
                        },
                }
                const node3 = this.state.graph.findById(`${j}`);
                const node4 = this.state.graph.findById(`${j+1}`);
                this.state.graph.updateItem(node3, model3);
                this.state.graph.updateItem(node4, model4);
                await sleep(this.state.animationstep);
            }
        }
        alert("Sort Complete");
    }

    async binary_search (Data, DataStructure, value) {
        let l = 0, r = DataStructure.arrList.length - 1;
        let node_l = this.state.graph.findById(l)
        let model_l = node_l.getModel();
        let node_r = this.state.graph.findById(r)
        let model_r = node_r.getModel();
        let node_mid = this.state.graph.findById(Math.floor((l+r)/2))
        let model_mid = node_mid.getModel();
        this.state.graph.addItem('node', {
            x: model_l.x,
            y: model_l.y+20,
            id: `node_l`,
            label: `l`,
            type:'rect',
            size:[30,20],
            style:{
                fill: '#D8BFD8',
                stroke: '#F3F0E7',
                lineWidth: 1,
                shadowColor:'#D8BFD8'

            },
        });
        this.state.graph.addItem('node', {
            x: model_r.x,
            y: model_r.y+20,
            id: `node_r`,
            label: `r`,
            type:'rect',
            size:[30,20],
            style:{
                fill: '#D8BFD8',
                stroke: '#F3F0E7',
                lineWidth: 1,
                shadowColor:'#D8BFD8'

            },
        });
        this.state.graph.addItem('node', {
            x: model_mid.x,
            y: model_mid.y+20,
            id: `node_mid`,
            label: `mid`,
            type:'rect',
            size:[30,20],
            style:{
                fill: '#D8BFD8',
                stroke: '#F3F0E7',
                lineWidth: 1,
                shadowColor:'#D8BFD8'

            },
        });
        await sleep(this.state.animationstep);
        while(l < r) {
            let mid = Math.floor((l + r) / 2);
            if(DataStructure.arrList[mid] >= value) {
                r = mid;
            }
            else {
                l = mid + 1;
            }
            node_l = this.state.graph.findById(l)
            model_l = node_l.getModel();
            node_r = this.state.graph.findById(r)
            model_r = node_r.getModel();
            node_mid = this.state.graph.findById(Math.floor((l+r)/2))
            model_mid = node_mid.getModel();
            
            const nodel = this.state.graph.findById(`node_l`)
            const noder = this.state.graph.findById(`node_r`)
            const nodemid = this.state.graph.findById(`node_mid`)

            this.state.graph.updateItem(nodel,{
                x:model_l.x,
            })
            this.state.graph.updateItem(noder,{
                x:model_r.x,
            })
            this.state.graph.updateItem(nodemid,{
                x:model_mid.x,
            })
            await sleep(this.state.animationstep);
        }
        const nodel = this.state.graph.findById(`node_l`)
        const noder = this.state.graph.findById(`node_r`)
        const nodemid = this.state.graph.findById(`node_mid`)
        this.state.graph.removeItem(nodel);
        this.state.graph.removeItem(noder);
        this.state.graph.removeItem(nodemid);
        alert(r);
    }

    reset_value = () => {
        for(let i = 0; i < DataArrList.state.nodes.length; i ++) {
            const item = this.state.graph.findById(`${i}`);
            this.state.graph.removeItem(item);
        }
        DataArrList.state.nodes.splice(0,DataArrList.state.nodes.length);
        DataArrListStructure.clear();
    }
    
    render() { 
        return (
            <div>
                <br />
                <div className='col-md-6 UI'>
                    <div className="input-group mb-3">
                        <div className='col-md-2'>
                            <select ref={this.input_type} className='form-select' id='selector_algorithm' defaultValue={'insert'}>
                                <option value="insert">insert</option>
                                <option value="delete">delete</option>
                                <option value="edit">edit</option>
                            </select>
                        </div>
                        <input ref={this.input_value} type="text" className="form-control" placeholder='Please input a value'></input>
                        <input ref={this.input_position} type="text" className="form-control" placeholder='Please input a position'></input>
                        <button className="btn btn-outline-secondary" type="button" onClick={() => this.getValue()}>Submit</button>
                        <button className="btn btn-outline-secondary" type="button" onClick={() => this.reset_value()}>Clear</button>
                    </div>
                </div>
                <div className='col-md-5 UI'>
                    <div className="input-group mb-3">
                        <div className='col-md-4.5'>
                            <select ref={this.algorithm_type} className='form-select' id='selector_algorithm' defaultValue={'Calculate Infix'}>
                                <option value="Bubble Sort">Bubble Sort</option>
                                <option value="Binary Search">Binary Search</option>
                            </select>
                        </div>
                        <input ref={this.algorithm_value} type="text" className="form-control" placeholder='Please input a value'></input>
                        <button className="btn btn-outline-secondary" type="button" onClick={() => this.start_algorithm()}>Submit</button>
                    </div>
                </div>
                <div id="arrList_G6"></div>
            </div>
        );
    }
    componentDidMount() {
        this.setState({graph:G6_render_arrList(DataArrList.state, 'arrList_G6', DataArrListStructure)});
    }
}
 
export default ArrList;