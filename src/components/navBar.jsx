import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NavBar extends Component {
    state = {}

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className='container'>
                    <Link className="navbar-brand" to="/algorithm-visualization">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/algorithm-visualization/graph">Graph</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/algorithm-visualization/tree">Tree</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}