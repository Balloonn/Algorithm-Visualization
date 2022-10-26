import React, { Component } from 'react';
import G6_render_arrList from '../G6_render_arrList';
import { DataArrListStructure } from './../data/dataArrList';
import DataArrList from './../data/dataArrList';

class ArrList extends Component {
    input_value = React.createRef();  
    input_type = React.createRef();

    state = { 
        graph: {

        }
     } 

    getValue = () => {
        const value = this.input_value.current.value;
        const type = this.input_type.current.value;
        
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
                
                <div id="arrList_G6"></div>
            </div>
        );
    }
    componentDidMount() {
        this.setState({graph:G6_render_arrList(DataArrList.state, 'arrList_G6', DataArrListStructure)});
    }
}
 
export default ArrList;