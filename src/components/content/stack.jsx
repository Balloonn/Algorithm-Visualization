import React, { Component } from 'react';
import G6_render_stack from './../G6_render_stack';
import { DataStackStructure } from './../data/dataStack';
import DataStack from './../data/dataStack';

class Stack extends Component {

    input_value = React.createRef();  
    input_type = React.createRef();

    state = { 
        graph: {

        }
     } 

    getValue = () => {
        const value = this.input_value.current.value;
        const type = this.input_type.current.value;
        if(type === "push") {
            DataStackStructure.push(value);
            this.state.graph.addItem('node',{
                x:DataStackStructure.size() * 60,
                y:120,
                id:`${DataStackStructure.size()}`,
                label:value,
            });
            console.log(DataStackStructure.top());
            this.animationPush(value);
        }
        if(type === "pop") {
            const nodes = DataStack.state.nodes;
            const node = this.state.graph.findById(`${DataStackStructure.size()}`)
            this.state.graph.removeItem(node);
            DataStackStructure.pop();
            nodes.splice(nodes.length-1,1);
            this.animationPop();
        }
    }   

    animationPush = (value) => {

    }

    animationPop = () => {

    }

    render() { 
        return (
            <div>
                <br />
                <div className='col-md-6 UI'>
                    <div className="input-group mb-3">
                        <div className='col-md-3'>
                            <select ref={this.input_type} className='form-select' id='selector_algorithm' defaultValue={'dfs'}>
                                <option value="push">push</option>
                                <option value="pop">pop</option>
                            </select>
                        </div>
                        <input ref={this.input_value} type="text" className="form-control" placeholder='Please input a value'></input>
                        <button className="btn btn-outline-secondary" type="button" onClick={() => this.getValue()}>Submit</button>
                    </div>
                </div>
                
                <div id="stack_G6"></div>
            </div>
        );
    }
    componentDidMount() {
        this.setState({graph:G6_render_stack(DataStack.state, 'stack_G6', DataStackStructure)});
    }
}
    
export default Stack;