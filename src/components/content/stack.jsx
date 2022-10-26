import React, { Component } from 'react';
import G6_render_stack from './../G6_render_stack';
import { DataStackStructure } from './../data/dataStack';
import DataStack from './../data/dataStack';
import { StackStructure } from '../data structure/stackStructure';

class Stack extends Component {

    input_value = React.createRef();  
    input_type = React.createRef();
    algorithm_value = React.createRef();
    algorithm_type = React.createRef();

    state = { 
        graph: {

        }
     } 

    getValue = () => {
        const value = this.input_value.current.value;
        const type = this.input_type.current.value;
        
        if(type === "push") {
            DataStackStructure.push(value);
            DataStack.state.nodes.push({
                id: `${DataStackStructure.size()}`,
                x: (Math.floor((DataStackStructure.size() - 1) / 12) + 1) % 2 ? (((DataStackStructure.size() - 1) % 12 + 1)* 100 - 10):1280-(((DataStackStructure.size() - 1) % 12 + 1)* 100 - 10),
                y: (Math.floor((DataStackStructure.size() - 1) / 12) + 1) * 100,
                label: `${value}`,
            })
            this.animationPush(value);
        }
        if(type === "pop") {
            this.animationPop();
            DataStackStructure.pop();
            DataStack.state.nodes.splice(DataStackStructure.size(),1);
        }
    }   

    start_algorithm = () => {
        const value = this.algorithm_value.current.value;
        const type = this.algorithm_type.current.value;
        if(type === "Infix to Postfix") {
            let op = new StackStructure();
            let num = new StackStructure();
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
                        x = x * 10 + value[j] - '0';
                        j ++;
                    }
                    i = j - 1;
                    num.push(x);
                }
                else if(value[i] === '(') {
                    op.push(value[i]);
                }
                else if (value[i] === ')') {
                    while(op.top() !== '(') {
                        this.calculate(num, op);
                    }
                    op.pop();
                }
                else {
                    while(op.size() && pr[value[i]] <= pr[op.top()]) {
                        this.calculate(num, op);
                    }
                    op.push(value[i]);
                }
            }
            while(op.size()) {
                this.calculate(num, op);
            }
            alert(num.top());
        }
        if(type === "Calculate Postfix") {
            let op = new StackStructure();
            let pr = {
                '+': 1,
                '-': 1,
                '*': 2,
                '/': 2,
            };
            let buf = '';
            for(let i = 0; i < value.length; i ++) {
                if(this.isdigit(value[i])){
                    let j = i;
                    while(j<value.length && this.isdigit(value[j])) {
                        buf += value[j];
                        j ++;
                    }
                    i = j - 1;
                }
                else if(value[i] === '(') {
                    op.push(value[i]);
                }
                else if (value[i] === ')') {
                    while(op.top() !== '(') {
                        buf += op.top();
                        op.pop();
                    }
                    op.pop();
                }
                else {
                    if(op.empty()) {
                        op.push(value[i]);
                    }
                    else if(pr[value[i]] < pr[op.top()]) {
                        while(pr[value[i]] < pr[op.top()]) {
                            buf += op.top();
                            op.pop();
                        }
                        op.push(value[i]);
                    }
                    else {
                        op.push(value[i]);
                    }
                }
            }
            while(op.size()) {
                buf += op.top();
                op.pop();
            }
            alert(buf);
        }
    }

    calculate = (num, op) => {
        let b = num.top();
        num.pop();
        let a = num.top();
        num.pop();
        let x = 0;
        if(op.top() === '+') {
            x=a+b;
        }
        if(op.top() === '-') {
            x=a-b;
        }
        if(op.top() === '*') {
            x=a*b;
        }
        if(op.top() === '/') {
            x=a/b;
        }
        op.pop();
        num.push(x);
    }

    isdigit = (value) => {
        if(value - '0' >=0 && value - '9' <= 0) {
            return true;
        }
        return false;
    }

    animationPush = (value) => {
        this.state.graph.addItem('node',{
            x:(Math.floor((DataStackStructure.size() - 1) / 12) + 1) % 2 ? (((DataStackStructure.size() - 1) % 12 + 1)* 100 - 10):1280-(((DataStackStructure.size() - 1) % 12 + 1)* 100 - 10),
            y:(Math.floor((DataStackStructure.size() - 1) / 12) + 1) * 100,
            id:`${DataStackStructure.size()}`,
            label:value,
        });
        const source = this.state.graph.findById(`${DataStackStructure.size()}`);
        const target = this.state.graph.findById(`${DataStackStructure.size() - 1}`);
        DataStack.state.edges.push({
            source: source,
            target: target,
            id: `edge${DataStackStructure.size() - 1}`,
            });
        this.state.graph.addItem('edge', {
            source: source,
            target: target,
            id: `edge${DataStackStructure.size() - 1}`,
        });
    }

    animationPop = () => {
        const nodes = DataStack.state.nodes;
        const node = this.state.graph.findById(`${DataStackStructure.size()}`)
        this.state.graph.removeItem(node);
        nodes.splice(nodes.length-1,1);
    }

    reset_value = () => {
        for(let i = 0; i < DataStack.state.nodes.length; i ++) {
            let node = DataStack.state.nodes[i].id;
            const item = this.state.graph.findById(`${node}`);
            this.state.graph.removeItem(item);
        }
        DataStack.state.nodes.splice(0,DataStack.state.nodes.length);
        DataStackStructure.clear();
        DataStack.state.edges.splice(0,DataStack.state.edges.length);
        DataStackStructure.nodes.splice(0,DataStackStructure.nodes.length);
        
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
                        <div className='col-md-4'>
                            <select ref={this.algorithm_type} className='form-select' id='selector_algorithm' defaultValue={'Infix to Postfix'}>
                                <option value="Infix to Postfix">Infix to Postfix</option>
                                <option value="Calculate Postfix">Calculate Postfix</option>
                            </select>
                        </div>
                        <input ref={this.algorithm_value} type="text" className="form-control" placeholder='Please input an expression'></input>
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