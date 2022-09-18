import React, { Component, ReactDOM, useEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { NavBar } from './navBar';
import Home from './content/home';
import { NotFound } from './content/notFound';
import { Graph } from './content/graph';

export default class App extends Component {
    state = { }
    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <div className='container'>
                    <Routes>
                        <Route path='/algorithm-visualization' element={<Home/>}/>
                        <Route path='/algorithm-visualization/graph' element={<Graph/>}/>
                        {/* <Route path='/algorithm-visualization/tree' element={<Tree/>}/> */}
                        <Route path='/algorithm-visualization/404' element={<NotFound/>}/>
                        <Route path='/algorithm-visualization/*' element={<Navigate replace to="/algorithm-visualization/404"/>}/>
                    </Routes>
                </div>
            </React.Fragment>
        )
    }
}
