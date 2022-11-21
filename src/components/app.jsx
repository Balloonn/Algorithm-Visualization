import React, { Component, ReactDOM, useEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { NavBar } from './navBar';
import Home from './content/home';
import { NotFound } from './content/notFound';
import { Graph } from './content/graph';
import Stack from './content/stack';
import ArrList from './content/arrList';

export default class App extends Component {
    state = { }
    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/graph' element={<Graph/>}/>
                        <Route path='/stack' element={<Stack/>}/>
                        <Route path='/arrList' element={<ArrList/>}/>
                        <Route path='/404' element={<NotFound/>}/>
                        <Route path='/*' element={<Navigate replace to="/404"/>}/>
                    </Routes>
                </div>
            </React.Fragment>
        )
    }
}
