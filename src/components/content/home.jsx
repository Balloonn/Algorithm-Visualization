import React, { Component } from 'react';
import { Base } from './base';
import arrList from '../../images/arrList.jpg'
import stack from '../../images/stack.jpg'
import graph from '../../images/graph.jpg'

export default class Home extends Component {
    state = { };

    render() {
        return (
            <Base>
                <div className="card" style={{marginBottom:"30px", marginLeft:"40px",marginRight:"40px"}}>
                    <div className="card-body" style={{lineHeight:"40px"}}>
                        数据结构课设
                        <br />
                        在此次课设中使用JavaScript作为编程语言并结合G6.js可视化图形库进行开发，从而实现顺序表、链式栈、无向图的基本功能和算法动画实现。
                        <br />
                        王钟楠 20026105
                        <br />
                        2022.10
                    </div>
                </div>
                <div className="card" style={{width: "18rem",float:'left',marginLeft:'40px'}}>
                    <img src={arrList} className="card-img-top"/>
                    <div className="card-body">
                        <h5 className="card-title">ArrList</h5>
                        <p className="card-text">顺序表实现了基本的插入、删除与修改功能，并且支持冒泡排序或二分查找两类算法的应用，同时存在相应的动画演示。</p>
                        <a href="http://localhost:3000/algorithm-visualization/arrList" className="btn btn-primary" style={{alignItems:'center',textAlign:'center',display:'flex',justifyContent:'center'}}>Goto ArrList</a>
                    </div>
                </div>
                <div className="card" style={{width: "18rem",float:'left',marginLeft:'158px'}}>
                    <img src={stack} className="card-img-top"/>
                    <div className="card-body">
                        <h5 className="card-title">Stack</h5>
                        <p className="card-text">链式栈实现了基本的压入与弹出功能，并且支持中缀表达式的求值与括号匹配两类算法的应用，同时存在相应的动画演示。</p>
                        <a href="http://localhost:3000/algorithm-visualization/stack" className="btn btn-primary" style={{alignItems:'center',textAlign:'center',display:'flex',justifyContent:'center'}}>Goto Stack</a>
                    </div>
                </div>
                <div className="card" style={{width: "18rem",float:'left',marginLeft:'158px'}}>
                    <img src={graph} className="card-img-top"/>
                    <div className="card-body">
                        <h5 className="card-title">Graph</h5>
                        <p className="card-text">无向图实现了基本的增加、删除、拖拽点与边的功能，并且支持搜索和判断二分图两类算法的应用，同时存在相应的动画演示。</p>
                        <a href="http://localhost:3000/algorithm-visualization/graph" className="btn btn-primary" style={{alignItems:'center',textAlign:'center',display:'flex',justifyContent:'center'}}>Goto Graph</a>
                    </div>
                </div>
            </Base>
        )
    }
    
}