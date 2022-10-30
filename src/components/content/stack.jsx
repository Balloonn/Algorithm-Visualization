import React, { Component } from 'react';
import G6_render_stack from './../G6_render_stack';
import { DataStackStructure, DataOperationStructure } from './../data/dataStack';
import DataStack from './../data/dataStack';
import { DataOperation } from './../data/dataStack';
import { sleep } from './../sleep';

class Stack extends Component {

    input_value = React.createRef();  
    input_type = React.createRef();
    algorithm_value = React.createRef();
    algorithm_type = React.createRef();

    state = { 
        graph: {

        },
        animationstep: 1000,
     } 

    getValue = () => {
        const value = this.input_value.current.value;
        const type = this.input_type.current.value;
        
        if(type === "push") {
            this.Push(DataStack, DataStackStructure, value);
        }
        if(type === "pop") {
            this.Pop(DataStack, DataStackStructure);
        }
    }   

    Push = (Data, DataStructure, value) => {
        DataStructure.push(value);
        Data.state.nodes.push({
            id: `${Data.state.name}_${DataStructure.size()}`,
            x: (Math.floor((DataStructure.size() - 1) / 12) + 1) % 2 ? (((DataStructure.size() - 1) % 12 + 1)* 100 - 10):1280-(((DataStructure.size() - 1) % 12 + 1)* 100 - 10),
            y: Data === DataOperation ? 480 + (Math.floor((DataStructure.size() - 1) / 12) + 1) * 100 : (Math.floor((DataStructure.size() - 1) / 12) + 1) * 100,
            label: `${value}`,
        })
        this.animationPush(Data, DataStructure, value);
    }

    Pop = (Data, DataStructure) => {
        this.animationPop(Data, DataStructure);
        DataStructure.pop();
        Data.state.nodes.splice(DataStructure.size(),1);
    }

    async start_algorithm () {
        const value = this.algorithm_value.current.value;
        const type = this.algorithm_type.current.value;
        if(type === "Calculate Infix") {
            let pr = {
                '+': 1,
                '-': 1,
                '*': 2,
                '/': 2,
            }
            for(let i = 0; i < value.length; i ++) {
                if(this.isdigit(value[i])){
                    let x = 0;
                    let j = i;
                    while(j<value.length && this.isdigit(value[j])) {
                        x = x * 10 + parseInt(value[j]);
                        j ++;
                    }
                    i = j - 1;
                    this.Push(DataStack, DataStackStructure, x);
                    await sleep(this.state.animationstep);
                }
                else if(value[i] === '(') {
                    this.Push(DataOperation, DataOperationStructure, value[i]);
                    await sleep(this.state.animationstep);
                }
                else if (value[i] === ')') {
                    this.Push(DataOperation, DataOperationStructure, value[i]); 
                    await sleep(this.state.animationstep);
                    this.Pop(DataOperation, DataOperationStructure);
                    await sleep(this.state.animationstep);

                    while(DataOperationStructure.top() !== '(') {
                        await this.calculate();
                    }
                    this.Pop(DataOperation, DataOperationStructure);
                    await sleep(this.state.animationstep);
                }
                else {
                    while(DataOperationStructure.size() && pr[value[i]] <= pr[DataOperationStructure.top()]) {
                        await this.calculate();
                    }
                    this.Push(DataOperation, DataOperationStructure, value[i]);
                    await sleep(this.state.animationstep);
                }
            }
            while(DataOperationStructure.size()) {
                await this.calculate();
            }
            alert(DataStackStructure.top());
        }
        if(type === "Parentheses Matching") {
            let valid = true;
            const map = {
                ']':'[',
                '}':'{',
                ')':'(',
                '>':'<',
            }
            for(let i = 0; i < value.length; i ++) {
                if(value[i] === '{' || value[i] === '(' || value[i] === '<' || value[i] === '[') {
                    this.Push(DataOperation, DataOperationStructure, value[i]);
                    await sleep(this.state.animationstep);
                }
                else if(DataOperationStructure.top() !== map[value[i]]) {
                    break;
                }
                else {
                    this.Push(DataOperation, DataOperationStructure, value[i]);
                    await sleep(this.state.animationstep);
                    this.Pop(DataOperation, DataOperationStructure);
                    await sleep(this.state.animationstep);
                    this.Pop(DataOperation, DataOperationStructure);
                    await sleep(this.state.animationstep);
                }
            }
            if(valid) {
                alert("Valid !!!");
            }
            else {
                alert("Invalid !!!");
            }
        }
    }

    async calculate() {
        let b = DataStackStructure.top();
        this.Pop(DataStack, DataStackStructure)
        await sleep(this.state.animationstep);

        let a = DataStackStructure.top();
        this.Pop(DataStack, DataStackStructure)
        await sleep(this.state.animationstep);

        let x = 0;
        if(DataOperationStructure.top() === '+') {
            x=a+b;
        }
        if(DataOperationStructure.top() === '-') {
            x=a-b;
        }
        if(DataOperationStructure.top() === '*') {
            x=a*b;
        }
        if(DataOperationStructure.top() === '/') {
            x=a/b;
        }

        this.Pop(DataOperation, DataOperationStructure);
        await sleep(this.state.animationstep);

        this.Push(DataStack, DataStackStructure, x);
        await sleep(this.state.animationstep);
    }

    isdigit = (value) => {
        if(value - '0' >=0 && value - '9' <= 0) {
            return true;
        }
        return false;
    }

    animationPush = (Data, DataStructure, value) => {   
        this.state.graph.addItem('node',{
            x:(Math.floor((DataStructure.size() - 1) / 12) + 1) % 2 ? (((DataStructure.size() - 1) % 12 + 1)* 100 - 10):1280-(((DataStructure.size() - 1) % 12 + 1)* 100 - 10),
            y: Data === DataOperation ? 300 + (Math.floor((DataStructure.size() - 1) / 12) + 1) * 100 : (Math.floor((DataStructure.size() - 1) / 12) + 1) * 100,
            id:`${Data.state.name}_${DataStructure.size()}`,
            label:value,
        });
        const source = this.state.graph.findById(`${Data.state.name}_${DataStructure.size()}`);
        const target = this.state.graph.findById(`${Data.state.name}_${DataStructure.size() - 1}`);
        Data.state.edges.push({
            source: source,
            target: target,
            id: `${Data.state.name}_edge${DataStructure.size() - 1}`,
            });
        this.state.graph.addItem('edge', {
            source: source,
            target: target,
            id: `${Data.state.name}_edge${DataStructure.size() - 1}`,
        });
    }

    animationPop = (Data, DataStructure) => {
        const node = this.state.graph.findById(`${Data.state.name}_${DataStructure.size()}`)
        this.state.graph.removeItem(node);
    }

    reset_value = () => {
        for(let i = 0; i < DataStack.state.nodes.length; i ++) {
            let node = DataStack.state.nodes[i].id;
            const item = this.state.graph.findById(`${node}`);
            this.state.graph.removeItem(item);
        }
        for(let i = 0; i < DataOperation.state.nodes.length; i ++) {
            let node = DataOperation.state.nodes[i].id;
            const item = this.state.graph.findById(`${node}`);
            this.state.graph.removeItem(item);
        }
        DataStack.state.nodes.splice(0,DataStack.state.nodes.length);
        DataStackStructure.clear();
        DataStack.state.edges.splice(0,DataStack.state.edges.length);

        DataOperation.state.nodes.splice(0,DataOperation.state.nodes.length);
        DataOperationStructure.clear();
        DataOperation.state.edges.splice(0,DataOperation.state.edges.length);
    }

    render() { 
        return (
            <div>
                <br />
                <div className='col-md-5 UI'>
                    <div className="input-group mb-3">
                        <div className='col-md-3'>
                            <select ref={this.input_type} className='form-select' id='selector_algorithm' defaultValue={'push'}>
                                <option value="push">push</option>
                                <option value="pop">pop</option>
                            </select>
                        </div>
                        <input ref={this.input_value} type="text" className="form-control" placeholder='Please input a value'></input>
                        <button className="btn btn-outline-secondary" type="button" onClick={() => this.getValue()}>Submit</button>
                        <button className="btn btn-outline-secondary" type="button" onClick={() => this.reset_value()}>Clear</button>
                    </div>
                </div>
                <div className='col-md-6 UI'>
                    <div className="input-group mb-3">
                        <div className='col-md-4.5'>
                            <select ref={this.algorithm_type} className='form-select' id='selector_algorithm' defaultValue={'Calculate Infix'}>
                                <option value="Calculate Infix">Calculate Infix</option>
                                <option value="Parentheses Matching">Parentheses Matching</option>
                            </select>
                        </div>
                        <input ref={this.algorithm_value} type="text" className="form-control" placeholder='Please input a string'></input>
                        <button className="btn btn-outline-secondary" type="button" onClick={() => this.start_algorithm()}>Submit</button>
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